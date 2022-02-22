// Export the full public API of react-native-web
export {
  unstable_createElement,
  findNodeHandle,
  processColor,
  render,
  unmountComponentAtNode,
  NativeModules,
  // APIs
  AccessibilityInfo,
  Animated,
  Appearance,
  AppRegistry,
  AppState,
  BackHandler,
  Clipboard,
  DeviceInfo,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  Keyboard,
  LayoutAnimation,
  NativeEventEmitter,
  PanResponder,
  PixelRatio,
  Share,
  StyleSheet,
  UIManager,
  Vibration,
  // components
  ActivityIndicator,
  Button,
  CheckBox,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Picker,
  Pressable,
  ProgressBar,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
  YellowBox,
  // compat (components)
  DrawerLayoutAndroid,
  InputAccessoryView,
  ToastAndroid,
  // compat (apis)
  PermissionsAndroid,
  Settings,
  Systrace,
  TVEventHandler,
  // plugins
  DeviceEventEmitter,
  // hooks
  useColorScheme,
  useWindowDimensions,
} from 'react-native-web'

// APIs
export * as Alert from './apis/Alert'
export * as Linking from './apis/Linking'
export * as Platform from './apis/Platform'

if (window.ReactNativeElectron == null) {
  console.warn(
    'Could not access React Native Electron APIs, make sure the "react-native-electron/preload.js" script is preloaded in this window.',
  )
}
