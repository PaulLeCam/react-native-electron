// @flow

import electron from 'electron'
import PropTypes from 'prop-types'
import { Component } from 'react'
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
  static propTypes = {
    injectedJavaScript: PropTypes.string,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    onLoadStart: PropTypes.func,
    onMessage: PropTypes.func,
    onNavigationStateChange: PropTypes.func,
    source: PropTypes.oneOfType([
      PropTypes.shape({ uri: PropTypes.string.isRequired }),
      PropTypes.shape({ html: PropTypes.string.isRequired }),
    ]).isRequired,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
    ]),
  }

  state: State = {
    viewState: 'IDLE',
    lastErrorEvent: null,
  }

  webview: ?Object

  componentDidMount() {
    this.webview && this.webview.addEventListener('dom-ready', this.onDomReady)
    this.webview &&
      this.webview.addEventListener('did-fail-load', this.onDidFailLoad)
    this.webview &&
      this.webview.addEventListener('did-finish-load', this.onDidFinishLoad)
    this.webview &&
      this.webview.addEventListener('did-start-loading', this.onDidStartLoading)
    if (this.props.onMessage) {
      this.webview &&
        this.webview.addEventListener('ipc-message', this.onIPCMessage)
    }
    if (this.props.onNavigationStateChange) {
      this.webview &&
        this.webview.addEventListener('will-navigate', this.onWillNavigate)
      this.webview &&
        this.webview.addEventListener('did-navigate', this.onDidNavigate)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.onMessage) {
      if (!nextProps.onMessage) {
        this.webview &&
          this.webview.removeEventListener('ipc-message', this.onIPCMessage)
      }
    } else if (nextProps.onMessage) {
      this.webview &&
        this.webview.addEventListener('ipc-message', this.onIPCMessage)
    }

    if (this.props.onNavigationStateChange) {
      if (!nextProps.onNavigationStateChange) {
        this.webview &&
          this.webview.removeEventListener('will-navigate', this.onWillNavigate)
        this.webview &&
          this.webview.removeEventListener('did-navigate', this.onDidNavigate)
      }
    } else if (nextProps.onNavigationStateChange) {
      this.webview &&
        this.webview.addEventListener('will-navigate', this.onWillNavigate)
      this.webview &&
        this.webview.addEventListener('did-navigate', this.onDidNavigate)
    }
  }

  componentWillUnmount() {
    this.webview &&
      this.webview.removeEventListener('dom-ready', this.onDomReady)
    this.webview &&
      this.webview.removeEventListener('did-fail-load', this.onDidFailLoad)
    this.webview &&
      this.webview.removeEventListener('did-finish-load', this.onDidFinishLoad)
    this.webview &&
      this.webview.removeEventListener(
        'did-start-loading',
        this.onDidStartLoading,
      )
    if (this.props.onMessage) {
      this.webview &&
        this.webview.removeEventListener('ipc-message', this.onIPCMessage)
    }
    if (this.props.onNavigationStateChange) {
      this.webview &&
        this.webview.removeEventListener('will-navigate', this.onWillNavigate)
      this.webview &&
        this.webview.removeEventListener('did-navigate', this.onDidNavigate)
    }
  }

  bindWebView = (e: ?HTMLElement) => {
    this.webview = e
  }

  onDomReady = () => {
    if (this.webview && this.props.injectedJavaScript != null) {
      this.webview.executeJavaScript(this.props.injectedJavaScript)
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
      this.webview && this.webview.send('postMessage', message)
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
      ref: this.bindWebView,
      src,
      ...extraProps,
      ...props,
    })
  }
}
