import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'

// Alert module

ipcMain.handle('react-native-show-alert', async (event, options) => {
  const window = BrowserWindow.fromWebContents(event.sender)
  const { response } = await dialog.showMessageBox(window, options)
  return response
})

// Linking module

const trackedAppOpenURL = new Set()

function onOpenURL(_, url) {
  for (const tracked of trackedAppOpenURL) {
    const target = BrowserWindow.fromWebContents(tracked)
    if (target == null) {
      trackedAppOpenURL.delete(tracked)
    } else {
      target.send('react-native-app-open-url', url)
    }
  }
}

ipcMain.handle('react-native-get-initial-url', async () => {
  return process.argv[1]
})

ipcMain.handle('react-native-open-url', async (event, url) => {
  await shell.openExternal(url)
})

// Internal

ipcMain.on('react-native-supported', (event) => {
  event.returnValue = true
})

ipcMain.on('newListener', (event) => {
  if (event === 'react-native-app-open-url') {
    if (trackedAppOpenURL.size === 0) {
      app.on('open-url', onOpenURL)
    }
    trackedAppOpenURL.add(event.sender)
  }
})

ipcMain.on('removeListener', (event) => {
  if (event === 'react-native-app-open-url') {
    trackedAppOpenURL.delete(event.sender)
    if (trackedAppOpenURL.size === 0) {
      app.off('open-url', onOpenURL)
    }
  }
})
