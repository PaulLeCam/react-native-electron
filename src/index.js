// Export the full public API of react-native-web

export {
  // top-level API
  findNodeHandle,
  render,
  unmountComponentAtNode,
  // modules
  createDOMElement,
  NativeModules,
  processColor,
  // APIs
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  StyleSheet,
  UIManager,
  Vibration,
  // components
  ActivityIndicator,
  Button,
  Image,
  ListView,
  ProgressBar,
  ScrollView,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableBounce,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,
  ViewPropTypes,
} from 'react-native-web'

// APIs
export * as Alert from './apis/Alert'
export * as Clipboard from './apis/Clipboard'
export * as Linking from './apis/Linking'

// components
export WebView from './components/WebView'
