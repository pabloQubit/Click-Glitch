const { 
    app, BrowserWindow, 
    globalShortcut, ipcMain, 
} = require('electron');

if (require('electron-squirrel-startup')) return app.quit();
const path = require('path');
const CNF_DATA = JSON.parse(require('./config/ConfigurationManager.js').getConfigs());
const MacroMgr = require('./macro/MacroManager.js');

let
    isMacroEnabled = false,
    macro_mgr  = new MacroMgr(CNF_DATA);

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
        preload: path.join(__dirname, 'api/infoGUI.js')
    }
  });

  webContents = mainWindow.webContents;
  mainWindow.loadFile(path.join(__dirname, 'interface.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show()); 

};

// user clicked in START or STOP button 
ipcMain.on('changeMacroState', (event, arg) => { 
    isMacroEnabled = !isMacroEnabled;
});

app.whenReady().then(() => { 
    const ret = globalShortcut.register(CNF_DATA.hotkey, () => { 
        if (isMacroEnabled) { 
            macro_mgr.changeState()
        }
    })

    if (!ret) { 
        console.info('[debug] Global hotkey registering failed!')
    }

    if(globalShortcut.isRegistered(CNF_DATA.hotkey)) { 
        console.info('[debug] Global hotkey regitered!')
    }
})
app.on('ready', createWindow);

app.on('will-quit', () => { 
    macro_mgr.stopAll()
    globalShortcut.unregister(CNF_DATA.hotkey)
    
})

app.on('window-all-closed', () => {
  app.quit()
});

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});