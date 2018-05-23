// @flow

import electron from 'electron'
import { Component, createRef, type ElementRef } from 'react'
import { createElement } from 'react-native-web'
import warning from 'warning'

type ViewState = 'IDLE' | 'LOADING' | 'ERROR'

type NavigationState = {
  loading: boolean,
  url: string,
}

type Props = {
  injectedJavaScript?: string,
  onError?: (event: Event) => void,
  onLoad?: (event: Event) => void,
  onLoadEnd?: (event: Event) => void,
  onLoadStart?: (event: Event) => void,
  onMessage?: (event: Event) => void,
  onNavigationStateChange?: (state: NavigationState) => void,
  source: { uri: string } | { html: string },
  style?: number | Object | Array<number | Object>,
}

type State = {
  viewState: ViewState,
  lastErrorEvent: ?Event,
}

export default class WebView extends Component<Props, State> {
  state: State = {
    viewState: 'IDLE',
    lastErrorEvent: null,
  }

  // flowlint-next-line deprecated-type:off
  webviewRef: ElementRef<*> = createRef()

  componentDidMount() {
    const webview = this.webviewRef.current
    if (webview != null) {
      webview.addEventListener('dom-ready', this.onDomReady)
      webview.addEventListener('did-fail-load', this.onDidFailLoad)
      webview.addEventListener('did-finish-load', this.onDidFinishLoad)
      webview.addEventListener('did-start-loading', this.onDidStartLoading)
      if (this.props.onMessage) {
        webview.addEventListener('ipc-message', this.onIPCMessage)
      }
      if (this.props.onNavigationStateChange) {
        webview.addEventListener('will-navigate', this.onWillNavigate)
        webview.addEventListener('did-navigate', this.onDidNavigate)
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    const webview = this.webviewRef.current
    if (webview != null) {
      if (prevProps.onMessage) {
        if (!this.props.onMessage) {
          webview.removeEventListener('ipc-message', this.onIPCMessage)
        }
      } else if (this.props.onMessage) {
        webview.addEventListener('ipc-message', this.onIPCMessage)
      }

      if (prevProps.onNavigationStateChange) {
        if (!this.props.onNavigationStateChange) {
          webview.removeEventListener('will-navigate', this.onWillNavigate)
          webview.removeEventListener('did-navigate', this.onDidNavigate)
        }
      } else if (this.props.onNavigationStateChange) {
        webview.addEventListener('will-navigate', this.onWillNavigate)
        webview.addEventListener('did-navigate', this.onDidNavigate)
      }
    }
  }

  componentWillUnmount() {
    const webview = this.webviewRef.current
    if (webview != null) {
      webview.removeEventListener('dom-ready', this.onDomReady)
      webview.removeEventListener('did-fail-load', this.onDidFailLoad)
      webview.removeEventListener('did-finish-load', this.onDidFinishLoad)
      webview.removeEventListener('did-start-loading', this.onDidStartLoading)
      if (this.props.onMessage) {
        webview.removeEventListener('ipc-message', this.onIPCMessage)
      }
      if (this.props.onNavigationStateChange) {
        webview.removeEventListener('will-navigate', this.onWillNavigate)
        webview.removeEventListener('did-navigate', this.onDidNavigate)
      }
    }
  }

  onDomReady = () => {
    if (
      this.webviewRef.current != null &&
      this.props.injectedJavaScript != null
    ) {
      this.webviewRef.current.executeJavaScript(this.props.injectedJavaScript)
    }
  }

  onDidFailLoad = (event: Event) => {
    if (this.props.onError) {
      this.props.onError(event)
    }
    if (this.props.onLoadEnd) {
      this.props.onLoadEnd(event)
    }
    this.setState({
      lastErrorEvent: event,
      viewState: 'ERROR',
    })
  }

  onDidFinishLoad = (event: Event) => {
    if (this.props.onLoad) {
      this.props.onLoad(event)
    }
    if (this.props.onLoadEnd) {
      this.props.onLoadEnd(event)
    }
    this.setState({
      viewState: 'IDLE',
    })
  }

  onDidStartLoading = (event: Event) => {
    if (this.props.onLoadStart) {
      this.props.onLoadStart(event)
    }
    this.setState({
      viewState: 'LOADING',
    })
  }

  onWillNavigate = (e: Object) => {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange({
        loading: true,
        url: e.url,
      })
    }
  }

  onDidNavigate = (e: Object) => {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange({
        loading: false,
        url: e.url,
      })
    }
  }

  onIPCMessage = (e: Object) => {
    if (e.channel === 'postMessage' && this.props.onMessage) {
      const msg: Object = new Event('message')
      msg.nativeEvent = e
      msg.nativeEvent.data = e.args[0]
      this.props.onMessage(msg)
    }
  }

  postMessage = (message: string) => {
    if (this.props.onMessage) {
      this.webviewRef.current &&
        this.webviewRef.current.send('postMessage', message)
    } else {
      warning(
        false,
        'Cannot use postMessage() without setting the onMessage() handler',
      )
    }
  }

  render() {
    const {
      injectedJavaScript: _ijs,
      onError: _oe,
      onLoad: _ol,
      onLoadStart: _ols,
      onLoadEnd: _ole,
      onMessage,
      onNavigationStateChange: _onsc,
      source,
      ...props
    } = this.props
    const extraProps = {}

    if (onMessage) {
      extraProps.preload = electron.remote
        .require('path')
        .resolve(__dirname, 'WebView.preload')
    }

    let src
    if (source.uri != null) {
      src = source.uri
    } else if (typeof source.html === 'string') {
      src = `data:text/html,${source.html}`
    }

    return createElement('webview', {
      ref: this.webviewRef,
      src,
      ...extraProps,
      // flowlint-next-line inexact-spread:off
      ...props,
    })
  }
}
