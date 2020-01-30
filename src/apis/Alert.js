// @flow

import { remote } from 'electron'

type AlertButton = {
  text: string,
  onPress?: () => void,
}

type AlertType = 'none' | 'info' | 'error' | 'question' | 'warning'

type AlertRes = {
  response: number,
  checkboxChecked: boolean,
}

export const alert = (
  title: string,
  message: ?string,
  buttons: AlertButton[] = [],
  type: AlertType = 'none',
) => {
  remote.dialog
    .showMessageBox(remote.getCurrentWindow(), {
      type,
      buttons: buttons.map(b => b.text),
      message: title,
      detail: message,
    })
    .then(({ response }: AlertRes) => {
      const button = buttons[response]
      if (button && button.onPress) {
        button.onPress()
      }
    })
}
