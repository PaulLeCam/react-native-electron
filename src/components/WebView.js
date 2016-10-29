// @flow

import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native-web'

export default class WebView extends Component {
  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }).isRequired,
  };

  render () {
    const { source, ...props } = this.props
    const styleProps = StyleSheet.resolve(props)
    return <webview src={source.uri} {...styleProps} />
  }
}
