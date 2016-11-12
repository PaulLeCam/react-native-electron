// @flow

import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native-web'

export default class WebView extends Component {
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }).isRequired,
  };

  bindWebView = (e) => {
    this.webview = e
  }

  render () {
    const { source, ...props } = this.props
    return (
      <webview
        ref={this.bindWebView}
        src={source.uri}
        {...props}
        {...StyleSheet.resolve(props)}
      />
    )
  }
}
