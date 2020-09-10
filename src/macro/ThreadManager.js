const AutoClick = require('./AutoClick.js')
const child_process = require('child_process'
    )
let childProcesses = []

const increaseBy = 45 // percentage
const timesBy    = 1.8  // multiply factor
module.exports = class ThreadManager { 
    constructor (macro_cnf) { 
        
        // multiprocessing logic
            let // increasing delay by +45% for each new thread
                increase_hold = (increaseBy/100)*macro_cnf.hold_delay, 
                increase_rele = (increaseBy/100)*macro_cnf.release_delay; 

            for (let i = 1; i <= macro_cnf.cores_to_use; i++) { 
                let factor = i*timesBy;
                childProcesses.push(
                    child_process.fork(
                        require.resolve('./ChildThread.js'), 
                        { 
                            env: { HOLD_DELAY:   (macro_cnf.hold_delay+increase_hold)*factor,
                                   RELEASE_DELAY:(macro_cnf.release_delay+increase_rele)*factor }
                        }
                    )
                )

                childProcesses[(i-1)].on('exit', (code) => { 
                    console.log(`[debug] Thread exited.`)
                })
            }
    }

    start() { 
        this.sendMessageToChilds('start-clicking')
    }

    stop() { 
        this.sendMessageToChilds('stop-clicking')
    }

    stopAllThreads() { 
        this.sendMessageToChilds('shutdown')
    }

    sendMessageToChilds(msg) { 
        for (let i = 0; i < childProcesses.length; i++) { 

            childProcesses[i].send(msg);
        }
    }
}