;(function() {
  const ipc = require('electron').ipcRenderer

  ipc.on('postMessage', function(e, data) {
    const msg = new Event('message')
    msg.data = data
    document.dispatchEvent(msg)
  })

  window.postMessage = function(message) {
    ipc.sendToHost('postMessage', message)
  }
})()
