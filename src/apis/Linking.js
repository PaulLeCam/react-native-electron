// @flow

import { remote, shell } from 'electron'
import warning from 'warning'

const eventHandlers = new Map()

export const addEventListener = (type: string, handler: Function) => {
  if (type === 'url' && typeof handler === 'function') {
    const wrapHandler = (event: Object, url: string) => {
      handler({type, url})
    }
    eventHandlers.set(handler, wrapHandler)
    remote.app.on('open-url', wrapHandler)
  }
}

export const removeEventListener = (type: string, handler: Function) => {
  if (type === 'url' && typeof handler === 'function') {
    const wrapHandler = eventHandlers.get(handler)
    if (wrapHandler) {
      remote.app.removeListener('open-url', wrapHandler)
    }
    eventHandlers.delete(handler)
  }
}

export const openURL = (url: string, options: ?Object): Promise<void> => {
  return shell.openExternal(url, options)
    ? Promise.resolve()
    : Promise.reject(new Error('Could not open URL'))
}

export const canOpenUrl = () => {
  warning(false, 'Linking.canOpenUrl() is not implemented in react-native-electron')
}

export const getInitialURL = (): ?string => remote.process.argv[1] || null

// Non-RN, added for convenience
export const setAsDefaultProtocolClient = (scheme: string) => {
  remote.app.setAsDefaultProtocolClient(scheme)
}
