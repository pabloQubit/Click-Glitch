const AutoClick = require('./AutoClick.js')

let auto_click = new AutoClick(
	process.env.HOLD_DELAY,
	process.env.RELEASE_DELAY
)

console.info(`[debug] Worker ${process.pid} started!`)
process.on('message', (m) => { 

	switch (m) { 
		case 'start-clicking': 
			auto_click.startClickLoop(); 
			break;

		case 'stop-clicking': 
			auto_click.stopClickLoop();
			break;

		case 'shutdown':
			process.disconnect()
			process.kill(0)
	}
})