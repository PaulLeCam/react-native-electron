import type { ReactNativeElectron } from './src/types'

declare global {
  interface Window {
    ReactNativeElectron: ReactNativeElectron
  }
}
