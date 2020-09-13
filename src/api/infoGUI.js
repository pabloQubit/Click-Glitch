const cpus = require('os').cpus();
const { contextBridge, ipcRenderer } = require('electron');
const ConfigManager = require('../config/ConfigurationManager.js');

const CPU_NAME = cpus[0].model;
const CPU_CORES = cpus.length;

contextBridge.exposeInMainWorld(
  'config',
  {
    load: () => ConfigManager.getConfigs(),
    save: (newConfigs) => ConfigManager.setConfigs(newConfigs),
  },
);

contextBridge.exposeInMainWorld(
  'cpu',
  {
    getName: () => CPU_NAME,
    getCores: () => CPU_CORES,
  },
);

contextBridge.exposeInMainWorld(
  'macro',
  {
    changeState: () => ipcRenderer.send('changeMacroState'),
  },
);
