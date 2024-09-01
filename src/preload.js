const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer to the renderer process via the window.electron object
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        // Ensure all necessary methods are exposed
        invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
    }
});
