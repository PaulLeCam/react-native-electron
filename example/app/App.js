// @flow

import React, { StrictMode, useState } from 'react'
import {
  Alert,
  Clipboard,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const WEBSITES = {
  'React Native':
    'https://facebook.github.io/react-native/docs/getting-started.html',
  'React Native for Web':
    'https://github.com/necolas/react-native-web/blob/master/README.md',
  Electron: 'https://electronjs.org/docs/',
}

type WebSite = $Keys<typeof WEBSITES>

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
  const tabs = Object.keys(WEBSITES).map((website: WebSite) => (
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
        <Text>{website}</Text>
      </View>
    </TouchableWithoutFeedback>
  ))

  return <View style={styles.navBar}>{tabs}</View>
}

const UriBar = ({ uri }: { uri: string }) => (
  <View style={styles.uriBar}>
    <View style={styles.uriValueView}>
      <Text numberOfLines={1} style={styles.uriText}>
        {uri}
      </Text>
    </View>
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
)

const SelectUriBar = () => (
  <View style={styles.uriBar}>
    <View style={styles.uriValueView}>
      <Text numberOfLines={1} style={styles.uriText}>
        Select one of the projects above to load its documentation
      </Text>
    </View>
  </View>
)

const App = () => {
  const [website, setWebSite] = useState<?WebSite>(null)

  let uri
  let uriBar
  if (website) {
    uri = WEBSITES[website]
    uriBar = <UriBar uri={uri} />
  } else {
    uriBar = <SelectUriBar />
  }

  return (
    <StrictMode>
      <View style={styles.layout}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>React Native Electron</Text>
        </View>
        <View style={styles.subtitleView}>
          <Text style={styles.subtitleText}>
            Electron extensions to React Native for Web
          </Text>
        </View>
        <NavBar active={website} onSelect={setWebSite} />
        {uriBar}
      </View>
    </StrictMode>
  )
}

export default App
