// @flow
// Export the full public API of react-native-web

export {
  // react-dom
  findNodeHandle,
  hydrate,
  render,
  unmountComponentAtNode,
  // modules
  createElement,
  NativeModules,
  processColor,
  // APIs
  Animated,
  AppRegistry,
  AppState,
  AsyncStorage,
  BackHandler,
  Dimensions,
  Easing,
  I18nManager,
  InteractionManager,
  Keyboard,
  NetInfo,
  PanResponder,
  PixelRatio,
  Platform,
  StyleSheet,
  UIManager,
  Vibration,
  // components
  ActivityIndicator,
  ART,
  Button,
  CheckBox,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ListView,
  Modal,
  Picker,
  ProgressBar,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  Slider,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableBounce,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
  // propTypes
  ColorPropType,
  EdgeInsetsPropType,
  PointPropType,
  TextPropTypes,
  ViewPropTypes,
} from 'react-native-web'

// APIs
export * as Alert from './apis/Alert'
export * as Clipboard from './apis/Clipboard'
export * as Linking from './apis/Linking'

// components
export { default as WebView } from './components/WebView'
