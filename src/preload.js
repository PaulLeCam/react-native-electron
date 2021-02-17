import { ipcRenderer } from 'electron'
import EventEmitter from 'events'

const ipc = new EventEmitter()

ipc.on('newListener', (event) => {
  if (!ipcRenderer.sendSync('react-native-supported')) {
    console.warn(
      'Could not attach React Native event listener, make sure the "react-native-electron/main" module is imported in your main process.',
    )
  }
  if (ipc.listenerCount(event) === 0) {
    ipcRenderer.on(`react-native-${event}`, (...args) => {
      ipc.emit(event, ...args)
    })
    ipcRenderer.emit(`react-native-on-${event}`)
  }
})

ipc.on('removeListener', (event) => {
  if (ipc.listenerCount(event) === 0) {
    ipcRenderer.off(`react-native-${event}`)
    ipcRenderer.emit(`react-native-off-${event}`)
  }
})

async function getInitialURL() {
  return await ipcRenderer.invoke('react-native-get-initial-url')
}

async function openURL(url) {
  return await ipcRenderer.invoke('react-native-open-url', url)
}

async function showAlert(config) {
  return await ipcRenderer.invoke('react-native-show-alert', config)
}

window.ReactNativeElectron = {
  ipc,
  getInitialURL,
  openURL,
  showAlert,
}
