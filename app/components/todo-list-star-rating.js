import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  firebase: service('firebase-api-handling'),
  classNames: ['todo-list-star-rating'],
  init() {
    this._super(...arguments);
    this.set('array', new Array(5));
  },
  changeRating(rating) {
    rating = rating == this.data.priority ? rating - 1 : rating;
    this.set('data.priority', rating);
    this.firebase.modifyData(this.data, this.index);
  },
});
