import { BrowserWindow, dialog, ipcMain, shell } from 'electron'
import type { MessageBoxOptions, WebContents } from 'electron'

// Alert module

ipcMain.handle(
  'react-native-show-alert',
  async (event, options: MessageBoxOptions) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window != null) {
      const { response } = await dialog.showMessageBox(window, options)
      return response
    }
  },
)

// Linking module

const appOpenURLTargets = new WeakSet<WebContents>()

export function sendOpenURL(url: string) {
  for (const window of BrowserWindow.getAllWindows()) {
    if (appOpenURLTargets.has(window.webContents)) {
      window.webContents.send('react-native-app-open-url', url)
    }
  }
}

ipcMain.handle('react-native-add-app-open-url', (event) => {
  appOpenURLTargets.add(event.sender)
})

ipcMain.handle('react-native-get-initial-url', () => {
  return Promise.resolve(process.argv[1])
})

ipcMain.handle('react-native-open-url', async (event, url: string) => {
  await shell.openExternal(url)
})

// Internal

ipcMain.on('react-native-supported', (event) => {
  event.returnValue = true
})
