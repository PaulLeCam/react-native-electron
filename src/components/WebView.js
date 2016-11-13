// @flow

import electron from 'electron'
import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native-web'
import warning from 'warning'

export default class WebView extends Component {
  static propTypes = {
    onMessage: PropTypes.func,
    source: PropTypes.oneOfType([
      PropTypes.shape({uri: PropTypes.string.isRequired}),
      PropTypes.shape({html: PropTypes.string.isRequired}),
    ]).isRequired,
  };

  webview: Object

  componentDidMount () {
    if (this.props.onMessage) {
      this.webview.addEventListener('ipc-message', this.onIPCMessage)
      this.webview.addEventListener('dom-ready', () => {
        this.webview.openDevTools()
      })
    }
  }

  componentWillReceiveProps (nextProps: Object) {
    if (this.props.onMessage) {
      if (!nextProps.onMessage) {
        this.webview.removeEventListener('ipc-message', this.onIPCMessage)
      }
    } else if (nextProps.onMessage) {
      this.webview.addEventListener('ipc-message', this.onIPCMessage)
    }
  }

  componentWillUnmount () {
    if (this.props.onMessage) {
      this.webview.removeEventListener('ipc-message', this.onIPCMessage)
    }
  }

  bindWebView = (e: Object) => {
    this.webview = e
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
      warning(false, 'Cannot use postMessage() without setting the onMessage() handler')
    }
  }

  render () {
    const { onMessage, source, ...props } = this.props
    const extraProps = {}

    if (onMessage) {
      extraProps.preload = electron.remote.require('path').resolve(__dirname, 'WebView.preload')
    }

    return (
      <webview
        ref={this.bindWebView}
        src={source.uri ? source.uri : 'data:text/html,' + source.html}
        {...props}
        {...StyleSheet.resolve(props)}
        {...extraProps}
      />
    )
  }
}
