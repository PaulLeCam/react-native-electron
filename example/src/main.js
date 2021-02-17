const { app, BrowserWindow } = require('electron')

require('react-native-electron/main')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      contextIsolation: false,
      preload: require('path').resolve(
        require.resolve('react-native-electron/preload'),
      ),
    },
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
