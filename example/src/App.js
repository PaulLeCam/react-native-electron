import React, { StrictMode, useEffect, useState } from 'react'
import {
  Alert,
  Clipboard,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
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

function getWebsite(nameOrURI) {
  for (const [name, uri] of Object.entries(WEBSITES)) {
    if (name === nameOrURI || uri === nameOrURI) {
      return name
    }
  }
}

function NavBar({ active, onSelect }) {
  const tabs = Object.keys(WEBSITES).map((website) => (
    <Pressable
      key={website}
      onPress={() => {
        onSelect(website)
      }}>
      <View style={[styles.navBarTab, active === website && styles.navBarTabActive]}>
        <Text>{website}</Text>
      </View>
    </Pressable>
  ))

  return <View style={styles.navBar}>{tabs}</View>
}

function UriBar({ uri }) {
  return (
    <View style={styles.uriBar}>
      <View style={styles.uriValueView}>
        <Text numberOfLines={1} style={styles.uriText}>
          {uri}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(uri)
          Alert.alert('Copy to clipboard', `Copied URI to clipboard: ${uri}`)
        }}
        style={styles.uriTouchable}>
        <Text style={styles.uriText}>Copy to clipboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(uri)
        }}
        style={styles.uriTouchable}>
        <Text style={styles.uriText}>Open in browser</Text>
      </TouchableOpacity>
    </View>
  )
}

function SelectUriBar() {
  return (
    <View style={styles.uriBar}>
      <View style={styles.uriValueView}>
        <Text numberOfLines={1} style={styles.uriText}>
          Select one of the projects above to load its documentation
        </Text>
      </View>
    </View>
  )
}

function schemeStyle(styleName, colorScheme) {
  const baseStyle = styles[styleName]
  return colorScheme === 'dark' ? [baseStyle, styles[`${styleName}Dark`]] : baseStyle
}

export default function App() {
  const colorScheme = useColorScheme()
  const [website, setWebSite] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      const match = getWebsite(e.url)
      if (match != null) {
        setWebSite(match)
      }
    }
    Linking.addEventListener('url', handler)

    Linking.getInitialURL().then((url) => {
      const match = getWebsite(url)
      if (match != null) {
        setWebSite(match)
      }
    })

    return () => {
      Linking.removeEventListener('url', handler)
    }
  }, [])

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
          <Text style={schemeStyle('titleText', colorScheme)}>React Native Electron</Text>
        </View>
        <View style={styles.subtitleView}>
          <Text style={schemeStyle('subtitleText', colorScheme)}>
            Electron extensions to React Native for Web on {Platform.nativeOS}
          </Text>
        </View>
        <NavBar active={website} onSelect={setWebSite} />
        {uriBar}
      </View>
    </StrictMode>
  )
}
