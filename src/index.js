const {
  app, BrowserWindow,
  globalShortcut,
  ipcMain,
} = require('electron');

const eSquirrel = require('electron-squirrel-startup');

if (eSquirrel) app.quit();

const path = require('path');
const CNF_DATA = JSON.parse(
  require('./config/ConfigurationManager.js').getConfigs(),
);
const MacroMgr = require('./macro/MacroManager.js');

let isMacroEnabled = false;
const macroMgr = new MacroMgr(CNF_DATA);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 375,
    resizable: false,
    maximizable: false,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'api/infoGUI.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'interface.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());
};

// user clicked in START or STOP button
ipcMain.on('changeMacroState', () => {
  isMacroEnabled = !isMacroEnabled;
});

app.whenReady().then(() => {
  const ret = globalShortcut.register(CNF_DATA.hotkey, () => {
    if (isMacroEnabled) {
      macroMgr.changeState();
    }
  });

  if (!ret) {
    // todo
  }

  if (globalShortcut.isRegistered(CNF_DATA.hotkey)) {
    // todo
  }
});
app.on('ready', createWindow);

app.on('will-quit', () => {
  macroMgr.stopAll();
  globalShortcut.unregister(CNF_DATA.hotkey);
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
