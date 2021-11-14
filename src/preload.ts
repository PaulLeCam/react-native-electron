import { contextBridge, ipcRenderer } from 'electron'

import type { Listener, ShowAlertConfig } from './types'

function addAppOpenURLListener(listener: Listener) {
  ipcRenderer.addListener('react-native-app-open-url', listener)
  void ipcRenderer.invoke('react-native-add-app-open-url')
}

function removeAppOpenURLListener(listener: Listener) {
  ipcRenderer.removeListener('react-native-app-open-url', listener)
}

async function getInitialURL(): Promise<string> {
  return (await ipcRenderer.invoke('react-native-get-initial-url')) as string
}

async function openURL(url: string): Promise<void> {
  await ipcRenderer.invoke('react-native-open-url', url)
}

async function showAlert(config: ShowAlertConfig): Promise<void> {
  await ipcRenderer.invoke('react-native-show-alert', config)
}

contextBridge.exposeInMainWorld('ReactNativeElectron', {
  appOpenURL: {
    addListener: addAppOpenURLListener,
    removeListener: removeAppOpenURLListener,
  },
  getInitialURL,
  openURL,
  showAlert,
})
