// @flow

import { remote, shell } from 'electron'

const eventHandlers = new Map()

export const addEventListener = (type: string, handler: Function) => {
  if (type === 'url' && typeof handler === 'function') {
    const wrapHandler = (event: Object, url: string) => {
      handler({ type, url })
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

// Apply same behavior as RNW
export const canOpenURL = (): Promise<boolean> => Promise.resolve(true)

export const getInitialURL = (): Promise<?string> =>
  Promise.resolve(remote.process.argv[1] || null)
