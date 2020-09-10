const { contextBridge, ipcRenderer } = require('electron')
const ConfigManager = require('../config/ConfigurationManager.js')

const 
	cpus = require('os').cpus(), 
	CPU_NAME  = cpus[0].model, 
	CPU_CORES = cpus.length;

contextBridge.exposeInMainWorld(
	'config',
    { 
		load: () => 		ConfigManager.getConfigs(), 
		save: (new_cnfs) => ConfigManager.setConfigs(new_cnfs)
	}
);

contextBridge.exposeInMainWorld(
	'cpu',
	{
		getName:  () => CPU_NAME,
		getCores: () => CPU_CORES
	}
)

contextBridge.exposeInMainWorld(
	'macro',
	{
		changeState: () => ipcRenderer.send('changeMacroState')
	}
)