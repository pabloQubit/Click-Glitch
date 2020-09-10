'use strict'

const 
	input_down = document.getElementById('down_delay'), 
	input_rele = document.getElementById('release_delay'), 
	input_hotk = document.getElementById('hotkey'),
	input_cores = document.getElementById('useCores'),

	oneThread  		= document.getElementById('one'), 
	twoThread  		= document.getElementById('two'), 
	customThread	= document.getElementById('custom'),
	saveButton  = document.getElementById('btn_save'), 
	macroButton = document.getElementById('btn_macro'); 

window.onload = function() { 
	// load configs
	window.read_configs = JSON.parse(window.config.load())
	console.log(read_configs)
	input_down.value = window.read_configs.hold_delay
	input_rele.value = window.read_configs.release_delay
	input_hotk.value = window.read_configs.hotkey.toUpperCase()

	let checkRatio = (elem) => elem.setAttribute('checked', 'checked')
	switch (window.read_configs.cores_to_use) { 

		case 1:  checkRatio(oneThread); break;
		case 2:  checkRatio(twoThread); break; 
		default: checkRatio(customThread); break;
	}
}

// save configs
function save_cnfs() { 
	let nCoresToUse = 1 

	// verify processor cores, if custom is marked
	if (customThread.checked) { 

		try { 
			nCoresToUse = parseInt(input_cores.value)
			let avaliableCores = window.cpu.getCores();
			let cpuModel	   = window.cpu.getName(); 

			if (nCoresToUse > avaliableCores) { 

				alert(`Sir, your ${cpuModel} has only ${avaliableCores} cores.`)
				return;
			}
		} catch (err) { 
			alert('Use integer values only in custom cores.')
		}
	} else if (twoThread.checked) nCoresToUse = 2; 

	// verify all inputs 
	if (
		input_down.value === '' ||
		input_rele.value === '' || 
		input_hotk.value === ''
		//!input_cores.disabled && input_cores.value === ''
	) {
		alert('Fill all inputs!')
	} else {

		saveButton.innerHTML = 'Saving...'
		let object_config = { 

			hold_delay: 	input_down.value,
			release_delay: 	input_rele.value,
			hotkey:         input_hotk.value.toLowerCase(),
			cores_to_use:   nCoresToUse
			
		}

		window.config.save(object_config);
		setTimeout(() => { 

			saveButton.innerHTML = 'Saved!'
			alert('Restart app to apply new configs!')
		}, 3)
	}
}

function changeMacroState() { 
	let array_input = document.querySelectorAll('input')
	let enable = (btn_macro.textContent === 'START'); 

	if (window.cpu.getCores() >= input_cores.value) {
		btn_macro.innerHTML = (enable) ? 'STOP' : 'START'; 
		array_input.forEach((input) => { 
			input.disabled = enable;
			input.contentEditable = !enable;
		})

		window.macro.changeState()
	} else { 

		alert(`Select a number of cores less or equal than ${window.cpu.getCores()}`)
	}
}

// LAYOUT FUNCTIONS
function change_state() { 

	if(saveButton.textContent = 'Saved!') { 
		saveButton.innerText = "Save configs.";
	}
}

function toUpper() { 

	input_hotk.value = input_hotk.value.toUpperCase();
}
