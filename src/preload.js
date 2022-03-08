const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')

console.log(ipcRenderer);
contextBridge.exposeInMainWorld('node', {
    nyan: async(data) => await ipcRenderer.invoke('nyan', data),
    fs: fs,
    ipcRenderer: ipcRenderer
})