// @flow

const remote = window.ReactNativeElectron

type AlertButton = {
  text: string,
  onPress?: () => void,
}

type AlertType = 'none' | 'info' | 'error' | 'question' | 'warning'

export const alert = (
  title: string,
  message: ?string,
  buttons: AlertButton[] = [],
  type: AlertType = 'none',
) => {
  remote
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
