// @flow

import { shell } from 'electron'
import warning from 'warning'

export const addEventListener = () => {
  warning(false, 'Linking.addEventListener() is not implemented in react-native-electron')
}

export const removeEventListener = () => {
  warning(false, 'Linking.removeEventListener() is not implemented in react-native-electron')
}

export const openURL = (url: string, options: ?Object): Promise<void> => {
  return shell.openExternal(url, options)
    ? Promise.resolve()
    : Promise.reject(new Error('Could not open URL'))
}

export const canOpenUrl = () => {
  warning(false, 'Linking.canOpenUrl() is not implemented in react-native-electron')
}

export const getInitialURL = () => {
  warning(false, 'Linking.canOpenUrl() is not implemented in react-native-electron')
}
