const childProcess = require('child_process');

const childProcesses = [];

const increaseBy = 45; // percentage
const timesBy = 1.8; // multiply factor
module.exports = class ThreadManager {
  constructor(userConfigs) {
    // multiprocessing logic
    // increasing delay by +45% for each new thread
    const increaseHold = (increaseBy / 100) * userConfigs.hold_delay;
    const increaseRelease = (increaseBy / 100) * userConfigs.release_delay;

    for (let i = 1; i <= userConfigs.cores_to_use; i += 1) {
      const factor = i * timesBy;
      childProcesses.push(
        childProcess.fork(
          require.resolve('./ChildThread.js'),
          {
            env: {
              HOLD_DELAY: (userConfigs.hold_delay + increaseHold) * factor,
              RELEASE_DELAY: (userConfigs.release_delay + increaseRelease) * factor,
            },
          },
        ),
      );

      // TODO: Implement winston module, to log the state of the child processes
      childProcesses[(i - 1)].on('exit', () => {

      });

      this.sendMsg = function sendMessageToChildProcesses(msg) {
        for (let c = 0; c < childProcesses.length; c += 1) {
          childProcesses[c].send(msg);
        }
      };
    }
  }

  start() {
    this.sendMsg('start-clicking');
  }

  stop() {
    this.sendMsg('stop-clicking');
  }

  stopAllThreads() {
    this.sendMsg('shutdown');
  }
};
