export type Listener = (..._args: Array<unknown>) => void

export type AlertType = 'none' | 'info' | 'error' | 'question' | 'warning'

export type ShowAlertConfig = {
  message: string
  buttons?: Array<string>
  detail?: string
  type?: AlertType
}

export type PlatformSelection = {
  win32?: unknown
  linux?: unknown
  darwin?: unknown
  electron?: unknown
  web?: unknown
  default?: unknown
}

export type ReactNativeElectron = {
  appOpenURL: {
    addListener(listener: Listener): void
    removeListener(listener: Listener): void
  }
  getInitialURL(): Promise<string | null>
  openURL(url: string): Promise<void>
  getClipboardText(): Promise<string>
  setClipboardText(text: string): Promise<void>
  showAlert(config: ShowAlertConfig): Promise<number>
  platform: string
}
