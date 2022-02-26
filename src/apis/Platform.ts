import type { ReactNativeElectron, PlatformSelection } from '../types'

const remote = window.ReactNativeElectron as ReactNativeElectron

export const isElectron = true

export const OS = 'web'

export const nativeOS = remote.platform

export const select = (selection: PlatformSelection): unknown => {
  if (remote && remote.platform in selection) return selection[remote.platform]
  else if ('electron' in selection) return selection.electron
  else if ('web' in selection) return selection.web
  else return selection.default
}
