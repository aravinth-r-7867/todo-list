import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['todo-list-addon-main-wrapper'],
  firebase: service('firebase-api-handling'),
  isAddRow: false,
  init() {
    this._super(...arguments);
    this.firebase.setup();
    this.set('newRowData', {
      'select': false,
      'name': '',
      'description': '',
      'priority': '',
      'status': ''
    });
  },
  mainData: computed('firebase.realData', function() {
    return this.firebase.realData;
  }),
  headersData: computed('firebase.headers', function() {
    return this.firebase.headers;
  }),
  addRow(){
    if(!this.newRowData.name){
      alert('Name cannot be empty');
      return;
    }
    this.firebase.addNewRow(this.newRowData);
    this.set('newRowData', {
      'select': false,
      'name': '',
      'description': '',
      'priority': '',
      'status': ''
    });
  }
});
