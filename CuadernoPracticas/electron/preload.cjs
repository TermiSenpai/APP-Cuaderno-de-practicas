const { contextBridge } = require('electron');

// Exponer información del entorno de forma segura al renderer
contextBridge.exposeInMainWorld('electron', {
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  },
  platform: process.platform,
  // Aquí se pueden agregar más APIs seguras si se necesitan en el futuro
  // Por ejemplo: para abrir archivos, acceder al sistema de archivos, etc.
});

console.log('[Preload] Preload script loaded successfully');
