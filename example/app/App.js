// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  Clipboard,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  WebView,
  // $FlowIgnore: module alias
} from 'react-native'

const WEBSITES = {
  'React Native':
    'https://facebook.github.io/react-native/docs/getting-started.html',
  'React Native for Web':
    'https://github.com/necolas/react-native-web/blob/master/README.md',
  Electron: 'http://electron.atom.io/docs/',
}

type WebSite = $Keys<typeof WEBSITES>

const WHITE = '#FFFFFF'
const GREY_LIGHT = '#EEEEEE'
const GREY_DARK = '#333333'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
  },
  titleView: {
    padding: 20,
    paddingBottom: 0,
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
  },
  subtitleView: {
    padding: 10,
    paddingBottom: 20,
  },
  subtitleText: {
    fontSize: 24,
    textAlign: 'center',
  },
  navBar: {
    backgroundColor: GREY_LIGHT,
    flex: 1,
    flexDirection: 'row',
  },
  navBarTab: {
    backgroundColor: GREY_LIGHT,
    borderColor: GREY_LIGHT,
    borderWidth: 7,
    padding: 3,
  },
  navBarTabActive: {
    borderBottomColor: GREY_DARK,
  },
  uriBar: {
    backgroundColor: GREY_DARK,
    flex: 1,
    flexDirection: 'row',
  },
  uriValueView: {
    flex: 1,
    padding: 10,
  },
  uriText: {
    color: 'white',
  },
  uriTouchable: {
    padding: 10,
  },
  webView: {
    height: 400,
  },
})

const copyURI = (uri: string) => {
  Clipboard.setString(uri)
  Alert.alert('Copy to clipboard', `Copied URI to clipboard: ${uri}`)
}

const openURI = (uri: string) => {
  Linking.openURL(uri)
}

const NavBar = ({
  active,
  onSelect,
}: {
  active: ?WebSite,
  onSelect: (website: WebSite) => void,
}) => {
  const tabs = Object.keys(WEBSITES).map((website: WebSite) =>
    <TouchableWithoutFeedback
      key={website}
      onPress={function() {
        onSelect(website)
      }}>
      <View
        style={[
          styles.navBarTab,
          active === website && styles.navBarTabActive,
        ]}>
        <Text>
          {website}
        </Text>
      </View>
    </TouchableWithoutFeedback>,
  )

  return (
    <View style={styles.navBar}>
      {tabs}
    </View>
  )
}

const UriBar = ({ loading, uri }: { loading: boolean, uri: string }) =>
  <View style={styles.uriBar}>
    <View style={styles.uriValueView}>
      <Text numberOfLines={1} style={styles.uriText}>
        {uri}
      </Text>
    </View>
    <ActivityIndicator animating={loading} color={WHITE} />
    <TouchableOpacity
      onPress={function() {
        copyURI(uri)
      }}
      style={styles.uriTouchable}>
      <Text style={styles.uriText}>Copy to clipboard</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={function() {
        openURI(uri)
      }}
      style={styles.uriTouchable}>
      <Text style={styles.uriText}>Open in browser</Text>
    </TouchableOpacity>
  </View>

const SelectUriBar = () =>
  <View style={styles.uriBar}>
    <View style={styles.uriValueView}>
      <Text numberOfLines={1} style={styles.uriText}>
        Select one of the projects above to load its documentation
      </Text>
    </View>
  </View>

type State = {
  loading: boolean,
  website: ?WebSite,
}

export default class App extends Component<any, State> {
  state: State = {
    loading: false,
    website: null,
  }

  onLoadStart = () => {
    this.setState({ loading: true })
  }

  onLoadEnd = () => {
    this.setState({ loading: false })
  }

  onSelect = (website: WebSite) => {
    this.setState({ website })
  }

  render() {
    const { loading, website } = this.state

    let uri
    let uriBar
    let webView = null
    if (website) {
      uri = WEBSITES[website]
      uriBar = <UriBar loading={loading} uri={uri} />
      webView = (
        <WebView
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          source={{ uri }}
          style={styles.webView}
        />
      )
    } else {
      uriBar = <SelectUriBar />
    }

    return (
      <View style={styles.layout}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>React Native Electron</Text>
        </View>
        <View style={styles.subtitleView}>
          <Text style={styles.subtitleText}>
            Electron extensions to React Native for Web
          </Text>
        </View>
        <NavBar active={website} onSelect={this.onSelect} />
        {uriBar}
        {webView}
      </View>
    )
  }
}
