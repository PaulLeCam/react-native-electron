import type { PlatformSelection } from '../types.js'

const remote = window.ReactNativeElectron

export const isElectron = true

export const OS = 'web'

export const nativeOS = remote.platform

export const select = (selection: PlatformSelection): unknown => {
  if (remote && remote.platform in selection) {
    return selection[remote.platform as keyof PlatformSelection]
  }
  if ('electron' in selection) {
    return selection.electron
  }
  if ('web' in selection) {
    return selection.web
  }
  return selection.default
}
