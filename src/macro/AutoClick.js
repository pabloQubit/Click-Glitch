const robot = require('robotjs')

module.exports = class { 

    constructor (toggle_button, hold_delay, release_delay) { 
        this.interval = null;
        this.click_timeout = null;
        this.wait_timeout  = null;

        this.mouse_btn = toggle_button;
        this.h_delay = hold_delay; 
        this.r_delay = release_delay;

        this.EXEC_DELAY = this.h_delay+this.r_delay;
    }

    giveClick(h_delay, r_delay) { 
        this.click_timeout = setTimeout(() => { 

            robot.mouseToggle('down')
            setTimeout(() => { 

                robot.mouseToggle('up')
            }, r_delay)
        }, h_delay)
    }

    startClickLoop() { 
        if (this.wait_timeout) clearTimeout(this.wait_timeout); 
        this.wait_timeout = null; 
        
        this.interval = setInterval(() => { 

            this.giveClick(this.h_delay, this.r_delay)
        }, this.EXEC_DELAY)
    }

    stopClickLoop() { 

        if (this.interval)      clearInterval(this.interval);
        if (this.click_timeout) clearTimeout(this.click_timeout);

        // clear instances
        this.interval = null; 
        this.click_timeout = null;
    }
}