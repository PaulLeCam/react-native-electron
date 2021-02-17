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
  useColorScheme,
} from 'react-native'

const WEBSITES = {
  'React Native': 'https://reactnative.dev/docs/getting-started',
  'React Native for Web': 'https://necolas.github.io/react-native-web/',
  Electron: 'https://electronjs.org/docs/',
}

const GREY_LIGHT = '#EEEEEE'
const GREY_DARK = '#333333'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
  },
  layoutDark: {
    backgroundColor: GREY_DARK,
  },
  titleView: {
    padding: 20,
    paddingBottom: 0,
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
  },
  titleTextDark: {
    color: GREY_LIGHT,
  },
  subtitleView: {
    padding: 10,
    paddingBottom: 20,
  },
  subtitleText: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitleTextDark: {
    color: GREY_LIGHT,
  },
  navBar: {
    backgroundColor: GREY_LIGHT,
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

const copyURI = (uri) => {
  Clipboard.setString(uri)
  Alert.alert('Copy to clipboard', `Copied URI to clipboard: ${uri}`)
}

const openURI = (uri) => {
  Linking.openURL(uri)
}

const NavBar = ({ active, onSelect }) => {
  const tabs = Object.keys(WEBSITES).map((website) => (
    <TouchableWithoutFeedback
      key={website}
      onPress={function () {
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

const UriBar = ({ uri }) => (
  <View style={styles.uriBar}>
    <View style={styles.uriValueView}>
      <Text numberOfLines={1} style={styles.uriText}>
        {uri}
      </Text>
    </View>
    <TouchableOpacity
      onPress={function () {
        copyURI(uri)
      }}
      style={styles.uriTouchable}>
      <Text style={styles.uriText}>Copy to clipboard</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={function () {
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

function schemeStyle(styleName, colorScheme) {
  const baseStyle = styles[styleName]
  return colorScheme === 'dark'
    ? [baseStyle, styles[`${styleName}Dark`]]
    : baseStyle
}

export default function App() {
  const colorScheme = useColorScheme()
  const [website, setWebSite] = useState(null)

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
      <View style={schemeStyle('layout', colorScheme)}>
        <View style={styles.titleView}>
          <Text style={schemeStyle('titleText', colorScheme)}>
            React Native Electron
          </Text>
        </View>
        <View style={styles.subtitleView}>
          <Text style={schemeStyle('subtitleText', colorScheme)}>
            Electron extensions to React Native for Web
          </Text>
        </View>
        <NavBar active={website} onSelect={setWebSite} />
        {uriBar}
      </View>
    </StrictMode>
  )
}
