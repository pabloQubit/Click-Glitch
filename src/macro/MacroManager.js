const ThreadManager = require('./ThreadManager.js');

module.exports = class {
  constructor(userConfigs) {
    this.isActive = false;
    this.threadManager = new ThreadManager(userConfigs);
  }

  changeState() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.threadManager.start();
    } else {
      this.threadManager.stop();
    }
  }

  stopAll() {
    this.threadManager.stopAllThreads();
  }
};
