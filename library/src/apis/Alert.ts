import type { AlertType, ReactNativeElectron } from '../types'

const remote = window.ReactNativeElectron as ReactNativeElectron

type AlertButton = {
  text: string
  onPress?: () => void
}

export const alert = (
  title: string,
  message?: string,
  buttons: AlertButton[] = [],
  type: AlertType = 'none',
) => {
  void remote
    .showAlert({
      type,
      buttons: buttons.map((b) => b.text),
      message: title,
      detail: message,
    })
    .then((response: number) => {
      const button = buttons[response]
      if (button && button.onPress) {
        button.onPress()
      }
    })
}
