// Export public APIs from react-native-web supported by react-native
export {
  AccessibilityInfo,
  ActivityIndicator,
  Animated,
  Appearance,
  AppRegistry,
  AppState,
  BackHandler,
  Button,
  DeviceEventEmitter,
  Dimensions,
  Easing,
  FlatList,
  findNodeHandle,
  I18nManager,
  Image,
  ImageBackground,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  LogBox,
  Modal,
  NativeEventEmitter,
  NativeModules,
  PanResponder,
  PixelRatio,
  Pressable,
  processColor,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  useColorScheme,
  useWindowDimensions,
  Vibration,
  View,
  VirtualizedList,
} from 'react-native-web'

// react-native-electron APIs
export * as Alert from './apis/Alert.js'
export * as Linking from './apis/Linking.js'
export * as Platform from './apis/Platform.js'

// react-native APIs needed by some modules
export const unstable_batchedUpdates = (callback: () => void) => {
  callback()
}

if (window.ReactNativeElectron == null) {
  console.warn(
    'Could not access React Native Electron APIs, make sure the "react-native-electron/preload.js" script is preloaded in this window.',
  )
}
