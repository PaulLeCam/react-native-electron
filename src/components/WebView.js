// @flow

import electron from 'electron'
import PropTypes from 'prop-types'
import { Component } from 'react'
import { createDOMElement } from 'react-native-web'
import warning from 'warning'

type ViewState = 'IDLE' | 'LOADING' | 'ERROR'

export default class WebView extends Component {
  static propTypes = {
    injectedJavaScript: PropTypes.string,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    onLoadStart: PropTypes.func,
    onMessage: PropTypes.func,
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

  state: {
    viewState: ViewState,
    lastErrorEvent: ?Event,
  } = {
    viewState: 'IDLE',
    lastErrorEvent: null,
  }

  webview: Object

  componentDidMount() {
    this.webview.addEventListener('dom-ready', this.onDomReady)
    this.webview.addEventListener('did-fail-load', this.onDidFailLoad)
    this.webview.addEventListener('did-finish-load', this.onDidFinishLoad)
    this.webview.addEventListener('did-start-loading', this.onDidStartLoading)
    if (this.props.onMessage) {
      this.webview.addEventListener('ipc-message', this.onIPCMessage)
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.onMessage) {
      if (!nextProps.onMessage) {
        this.webview.removeEventListener('ipc-message', this.onIPCMessage)
      }
    } else if (nextProps.onMessage) {
      this.webview.addEventListener('ipc-message', this.onIPCMessage)
    }
  }

  componentWillUnmount() {
    this.webview.removeEventListener('dom-ready', this.onDomReady)
    this.webview.removeEventListener('did-fail-load', this.onDidFailLoad)
    this.webview.removeEventListener('did-finish-load', this.onDidFinishLoad)
    this.webview.removeEventListener(
      'did-start-loading',
      this.onDidStartLoading,
    )
    if (this.props.onMessage) {
      this.webview.removeEventListener('ipc-message', this.onIPCMessage)
    }
  }

  bindWebView = (e: Object) => {
    this.webview = e
  }

  onDomReady = () => {
    if (this.props.injectedJavaScript) {
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

  onIPCMessage = (e: Object) => {
    if (e.channel === 'postMessage') {
      const msg: Object = new Event('message')
      msg.nativeEvent = e
      msg.nativeEvent.data = e.args[0]
      this.props.onMessage(msg)
    }
  }

  postMessage = (message: string) => {
    if (this.props.onMessage) {
      this.webview.send('postMessage', message)
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
      source,
      ...props
    } = this.props
    const extraProps = {}

    if (onMessage) {
      extraProps.preload = electron.remote
        .require('path')
        .resolve(__dirname, 'WebView.preload')
    }

    return createDOMElement('webview', {
      ref: this.bindWebView,
      src: source.uri ? source.uri : 'data:text/html,' + source.html,
      ...extraProps,
      ...props,
    })
  }
}
