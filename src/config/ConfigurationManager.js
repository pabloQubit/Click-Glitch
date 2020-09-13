const path = require('path');
const fs = require('fs');
const Configuration = require('./Configuration.js');

const DEFAULT_PATH = path.join(__dirname, '../../config.dat');

module.exports = class CnfMrg {
  // load from file 'config.json'
  static getConfigs() {
    try {
      const data = fs.readFileSync(DEFAULT_PATH,
        { encoding: 'utf8', flag: 'r' });
      return JSON.parse(data);
    } catch (err) {
      return JSON.stringify(Configuration.getDefaults());
    }
  }

  // save
  static setConfigs(updateTo) {
    const oldConfigs = JSON.stringify(JSON.parse(CnfMrg.getConfigs()));
    const newConfigs = JSON.stringify(updateTo);

    if (newConfigs !== oldConfigs) {
      fs.unlinkSync(DEFAULT_PATH);
      fs.writeFile(DEFAULT_PATH, JSON.stringify(newConfigs), (err) => {
        if (err) throw err;
      });
    }
  }
};
