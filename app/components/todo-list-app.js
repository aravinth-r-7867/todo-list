import Component from '@ember/component';

export default Component.extend({
  classNames: ['todo-list-addon-main-wrapper'],
  init() {
    this._super(...arguments);
    this.set('headers', {
      select: false,
      title: 'Name',
      desc: 'Description',
      priority: 'Priority',
      status: 'Status',
      notes: 'Notes',
    });
    this.set('data', [
      {
        select: false,
        title: 'A dummy task',
        desc: 'A dummy description',
        priority: 'Low',
        status: 'Yet to take',
        notes: 'This is a simple task to check the case',
      },
      {
        select: false,
        title: 'A dummy task',
        desc: 'A dummy description',
        priority: 'Low',
        status: 'Yet to take',
        notes: 'This is a simple task to check the case',
      },
      {
        select: false,
        title: 'A dummy task',
        desc: 'A dummy description',
        priority: 'Low',
        status: 'Yet to take',
        notes: 'This is a simple task to check the case',
      },
      {
        select: false,
        title: 'A dummy task',
        desc: 'A dummy description',
        priority: 'Low',
        status: 'Yet to take',
        notes: 'This is a simple task to check the case',
      },
      {
        select: false,
        title: 'A dummy task',
        desc: 'A dummy description',
        priority: 'Low',
        status: 'Yet to take',
        notes: 'This is a simple task to check the case',
      }
    ]);
  },
});
