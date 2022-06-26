import Component from '@ember/component';

export default Component.extend({
  classNames: [
    'todo-list-battery-indicator-wrapper todo-list-flex todo-list-align-items__center',
  ],
  batteryLevel: 0,
  didInsertElement() {
    this._super(...arguments);
    this.checkBatterylevel();
    setInterval(() => {
      navigator.getBattery().then((battery) => {
        // console.log(battery);
        this.set('batteryLevel', battery.level * 100);
      });
    }, 100);
  },
  checkBatterylevel() {
    let self = this;
    navigator.getBattery().then((battery) => {
      // console.log(battery);
      self.set('batteryLevel', battery.level * 100);
    });
  },
});
