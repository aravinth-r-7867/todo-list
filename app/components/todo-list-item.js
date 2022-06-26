import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  firebase: service('firebase-api-handling'),
  classNames: ['todo-list-row'],
  attributeBindings: ['isOpen:data-open'],
  isOpen: false,
  isTitleEdit: false,
  isDescEdit: false,
  init() {
    this._super(...arguments);
    this.set('statusOptions', [
      { value: 0, label: 'Yet to take' },
      { value: 1, label: 'In progress' },
      { value: 2, label: 'On hold' },
      { value: 3, label: 'Closed' },
      { value: 4, label: 'Waiting' },
      { value: 5, label: 'Need discussion' },
      { value: 6, label: 'Completed' },
    ]);
  },
  toggleItem() {
    this.toggleProperty('isOpen');
  },
  toggleEditTitle() {
    this.toggleProperty('isTitleEdit');
    if (!this.isTitleEdit) {
      this.firebase.modifyData('name', this.data.name, this.index);
    }
  },
  toggleEditDesc() {
    this.toggleProperty('isDescEdit');
    if (!this.isDescEdit) {
      this.firebase.modifyData(
        'description',
        this.data.description,
        this.index
      );
    }
  },
  actions: {
    changeStatus({ target }) {
      this.firebase.modifyData('status', Number(target.value), this.index);
    },
  },
});
