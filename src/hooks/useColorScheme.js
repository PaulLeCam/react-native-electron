// @flow

import { remote } from 'electron'
import { useEffect, useState } from 'react'

import { type ColorScheme, getColorScheme } from '../apis/Appearance'

export const useColorScheme = (): ColorScheme => {
  const [scheme, setScheme] = useState(getColorScheme())

  useEffect(() => {
    const onUpdated = () => {
      setScheme(getColorScheme())
    }

    remote.nativeTheme.on('updated', onUpdated)

    return () => {
      remote.nativeTheme.removeListener('updated', onUpdated)
    }
  }, [])

  return scheme
}
