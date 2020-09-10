const path = require('path')
const fs   = require('fs')

const Configuration = require('./Configuration.js')
const DEFAULT_PATH = path.join(__dirname, '../../config.dat')

module.exports = class CnfMrg { 

	// load from file 'config.json'
	static getConfigs() { 
		
		try { 
			const data = fs.readFileSync(DEFAULT_PATH, 
            {encoding:'utf8', flag:'r'}); 
			return JSON.parse(data);
		} catch(err) { 

			return JSON.stringify(Configuration.getDefaults())
		}
	}

	// save 
	static setConfigs(update_to) { 

		let old_configs = JSON.stringify(JSON.parse(CnfMrg.getConfigs()))
		let new_configs = JSON.stringify(update_to)

		if (new_configs !== old_configs) { 
			try {
				fs.unlinkSync(DEFAULT_PATH)
			} catch (err) {}

			fs.writeFile(DEFAULT_PATH, JSON.stringify(new_configs), (err) => { 

				if (err) throw err; 
				console.info('[debug] File config.json saved.')
			});
	    } else console.info('[debug] These settings have already been saved.')
	}
}