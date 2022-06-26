import Component from '@ember/component';

export default Component.extend({
  classNames: ['todo-list-loader-wrapper'],
  init() {
    this._super(...arguments);
    this.set('array', []);
    for (let i = 0; i < this.count; i++) {
      this.array.push(i);
    }
  },
});
