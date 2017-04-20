// @flow

import { remote } from 'electron'

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
  remote.dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      type,
      buttons: buttons.map(b => b.text),
      message: title,
      detail: message,
    },
    (index: number) => {
      const button = buttons[index]
      if (button && button.onPress) {
        button.onPress()
      }
    },
  )
}
