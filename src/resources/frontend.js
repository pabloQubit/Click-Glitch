/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */

const
  inputDown = document.getElementById('down_delay');
const inputRele = document.getElementById('release_delay');
const inputHotk = document.getElementById('hotkey');
const inputCores = document.getElementById('useCores');

const oneThread = document.getElementById('one');
const twoThread = document.getElementById('two');
const customThread = document.getElementById('custom');
const saveButton = document.getElementById('btn_save');
const btnMacro = document.getElementById('btn_macro');

const BTN_NAME = ['Saved!', 'Save configs'];
// BUTTON STATES
const BTN_NORMAL = 1;
const BTN_CHANGED = 0;

window.onload = function loadSavedUserConfigs() {
  // load configs
  window.readConfigs = JSON.parse(window.config.load());
  inputDown.value = window.readConfigs.hold_delay;
  inputRele.value = window.readConfigs.release_delay;
  inputHotk.value = window.readConfigs.hotkey.toUpperCase();

  const checkRatio = (elem) => elem.setAttribute('checked', 'checked');
  switch (window.readConfigs.cores_to_use) {
    case 1: checkRatio(oneThread); break;
    case 2: checkRatio(twoThread); break;
    default: checkRatio(customThread); break;
  }
};

// save configs
function saveCnfs() {
  let nCoresToUse = 1;

  // verify processor cores, if custom is marked
  if (customThread.checked) {
    try {
      nCoresToUse = parseInt(inputCores.value, 10);
      const avaliableCores = window.cpu.getCores();
      const cpuModel = window.cpu.getName();

      if (nCoresToUse > avaliableCores) {
        alert(`Sir, your ${cpuModel} has only ${avaliableCores} cores.`);
        return;
      }
    } catch (err) {
      alert('Use integer values only in custom cores.');
    }
  } else if (twoThread.checked) nCoresToUse = 2;

  // verify all inputs
  if (
    inputDown.value === '' || inputRele.value === '' || inputHotk.value === ''
  ) {
    alert('Fill all inputs!');
  } else {
    saveButton.innerHTML = 'Saving...';
    const objectConfig = {

      hold_delay: inputDown.value,
      release_delay: inputRele.value,
      hotkey: inputHotk.value.toLowerCase(),
      cores_to_use: nCoresToUse,

    };

    window.config.save(objectConfig);
    setTimeout(() => {
      saveButton.innerHTML = 'Saved!';
      alert('Restart app to apply new configs!');
    }, 3);
  }
}

function changeMacroState() {
  const arrayInput = document.querySelectorAll('input');
  const enable = (btnMacro.textContent === 'START');

  if (window.cpu.getCores() >= inputCores.value) {
    btnMacro.innerHTML = (enable) ? 'STOP' : 'START';
    arrayInput.forEach((input) => {
      const inputVar = input;
      inputVar.disabled = enable;
      inputVar.contentEditable = !enable;
    });

    window.macro.changeState();
  } else {
    alert(`Select a number of cores less or equal than ${window.cpu.getCores()}`);
  }
}

// LAYOUT FUNCTIONS
function changeState() {
  if (saveButton.textContent === BTN_NAME[BTN_CHANGED]) {
    saveButton.innerText = BTN_NAME[BTN_NORMAL];
  }
}

function toUpper() {
  inputHotk.value = inputHotk.value.toUpperCase();
}
