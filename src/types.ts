export type Listener = (..._args: Array<unknown>) => void

export type AlertType = 'none' | 'info' | 'error' | 'question' | 'warning'

export type ShowAlertConfig = {
  message: string
  buttons?: Array<string>
  detail?: string
  type?: AlertType
}

export type ReactNativeElectron = {
  appOpenURL: {
    addListener(_listener: Listener): void
    removeListener(_listener: Listener): void
  }
  getInitialURL(): Promise<string | null>
  openURL(_url: string): Promise<void>
  showAlert(_config: ShowAlertConfig): Promise<number>
}
