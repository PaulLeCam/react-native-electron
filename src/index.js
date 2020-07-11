// @flow

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
  AppRegistry,
  AppState,
  BackHandler,
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
  Platform,
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
  useWindowDimensions,
} from 'react-native-web'

// APIs
export * as Alert from './apis/Alert'
export * as Appearance from './apis/Appearance'
export * as Clipboard from './apis/Clipboard'
export * as Linking from './apis/Linking'

// hooks
export { useColorScheme } from './hooks/useColorScheme'
