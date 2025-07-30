import { AppRegistry } from 'react-native'

import App from './App'

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('app'),
})
