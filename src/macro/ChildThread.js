const AutoClick = require('./AutoClick.js');

const clickMacro = new AutoClick(
  process.env.HOLD_DELAY,
  process.env.RELEASE_DELAY,
);

process.on('message', (m) => {
  switch (m) {
    case 'start-clicking':
      clickMacro.startClickLoop();
      break;

    case 'stop-clicking':
      clickMacro.stopClickLoop();
      break;

      // shutdown case
    default:
      process.disconnect();
      process.kill(0);
  }
});
