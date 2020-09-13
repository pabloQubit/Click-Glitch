const
  DEFAULTS = {
    hold_delay: 115,
    release_delay: 15,
    hotkey: 'b',
    cores_to_use: 1,
  };

module.exports = class {
  static getDefaults() {
    return DEFAULTS;
  }
};
