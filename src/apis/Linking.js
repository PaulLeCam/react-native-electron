// @flow

const remote = window.ReactNativeElectron

const eventHandlers = new Map()

export const addEventListener = (type: string, handler: Function) => {
  if (type === 'url' && typeof handler === 'function') {
    const wrapHandler = (event: Object, url: string) => {
      handler({ type, url })
    }
    eventHandlers.set(handler, wrapHandler)
    remote.ipc.on('app-open-url', wrapHandler)
  }
}

export const removeEventListener = (type: string, handler: Function) => {
  if (type === 'url' && typeof handler === 'function') {
    const wrapHandler = eventHandlers.get(handler)
    if (wrapHandler) {
      remote.ipc.off('app-open-url', wrapHandler)
    }
    eventHandlers.delete(handler)
  }
}

export const openURL = async (url: string): Promise<void> => {
  await remote.openURL(url)
}

// Apply same behavior as RNW
export const canOpenURL = (): Promise<boolean> => Promise.resolve(true)

export const getInitialURL = async (): Promise<?string> => {
  return (await remote.getInitialURL()) || null
}
