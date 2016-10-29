const { app, BrowserWindow } = require('electron')

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    minWidth: 500,
    height: 620,
    minHeight: 500,
    center: true,
    show: false,
  })
  win.loadURL(`file://${__dirname}/index.html`)

  win.on('closed', () => {
    win = null
  })
  win.once('ready-to-show', () => {
    win.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
