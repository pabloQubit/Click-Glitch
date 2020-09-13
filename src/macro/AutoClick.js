const robot = require('robotjs');

module.exports = class {
  constructor(toggleButton, holdDelay, releaseDelay) {
    this.interval = null;
    this.click_timeout = null;
    this.wait_timeout = null;

    this.mouse_btn = toggleButton;
    this.pressDelay = holdDelay;
    this.getOffDelay = releaseDelay;

    this.EXEC_DELAY = this.pressDelay + this.getOffDelay;
  }

  giveClick(pressDelay, getOffDelay) {
    this.click_timeout = setTimeout(() => {
      robot.mouseToggle('down');
      setTimeout(() => {
        robot.mouseToggle('up');
      }, getOffDelay);
    }, pressDelay);
  }

  startClickLoop() {
    if (this.wait_timeout) clearTimeout(this.wait_timeout);
    this.wait_timeout = null;

    this.interval = setInterval(() => {
      this.giveClick(this.pressDelay, this.getOffDelay);
    }, this.EXEC_DELAY);
  }

  stopClickLoop() {
    if (this.interval) clearInterval(this.interval);
    if (this.click_timeout) clearTimeout(this.click_timeout);

    // clear instances
    this.interval = null;
    this.click_timeout = null;
  }
};
