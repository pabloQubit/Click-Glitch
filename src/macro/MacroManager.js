const ThreadManager = require('./ThreadManager.js')

module.exports = class { 

    constructor (inject_cnf) { 

        this.isActive = false
        this.threadManager = new ThreadManager(inject_cnf)
    }

    changeState() { 
        this.isActive = !this.isActive; 
        if (this.isActive) { 

            this.threadManager.start()
        } else { 

            this.threadManager.stop()
        }
    }

    stopAll() { 
        console.info('Calling threadManager to stop all threads.')
        this.threadManager.stopAllThreads()
    }
}