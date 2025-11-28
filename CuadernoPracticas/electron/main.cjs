const { app, BrowserWindow } = require('electron');
const path = require('path');

// En desarrollo, Vite estará corriendo en localhost:1420
// En producción, cargaremos los archivos build desde dist
// app.isPackaged es true cuando la app está empaquetada (exe, instalador, etc.)
const isDev = !app.isPackaged;

function createWindow() {
  console.log('[Electron] Creating main window...');
  console.log('[Electron] Mode:', isDev ? 'DEVELOPMENT' : 'PRODUCTION');
  console.log('[Electron] app.isPackaged:', app.isPackaged);
  console.log('[Electron] __dirname:', __dirname);

  const mainWindow = new BrowserWindow({
    title: 'Cuaderno de prácticas',
    width: 1200,
    height: 800,
    show: false, // No mostrar hasta que esté lista
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    },
    icon: path.join(__dirname, '../public/icons/icon.png')
  });

  // Maximizar la ventana al iniciar (como solicitó el usuario)
  mainWindow.maximize();
  
  // Mostrar la ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    console.log('[Electron] Window ready to show');
    mainWindow.show();
  });

  // Cargar la aplicación
  if (isDev) {
    console.log('[Electron] Loading from Vite dev server: http://localhost:1420');
    mainWindow.loadURL('http://localhost:1420');
    // Abrir DevTools SOLO en desarrollo
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('[Electron] Loading from built files:', indexPath);
    mainWindow.loadFile(indexPath);
  }

  // Log de navegación para debugging
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('[Electron] Page finished loading');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('[Electron] Failed to load:', errorCode, errorDescription);
  });
}

// Inicializar la aplicación cuando Electron esté listo
app.whenReady().then(() => {
  console.log('[Electron] App is ready');
  createWindow();

  // En macOS, re-crear ventana cuando se hace click en el dock
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Salir cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('[Electron] All windows closed, quitting app');
    app.quit();
  }
});

// Logging adicional para debugging
app.on('will-quit', () => {
  console.log('[Electron] App will quit');
});
