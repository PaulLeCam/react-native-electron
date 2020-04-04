// @flow

import { remote } from 'electron'

export type ColorScheme = 'light' | 'dark' | null

export const getColorScheme = (): ColorScheme => {
  return remote.nativeTheme.shouldUseDarkColors
    ? 'dark'
    : remote.nativeTheme.themeSource === 'system'
    ? null
    : 'light'
}
