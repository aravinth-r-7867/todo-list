import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ["todo-list-addon-main-wrapper"],
  firebase: service("firebase-api-handling"),
  openedItemIndex: null,
  init() {
    this._super(...arguments);
    this.firebase.setup();
  },
  mainData: computed("firebase.realData", function () {
    return (
      (this.firebase.realData &&
        this.firebase.realData.filter((item) => item)) ||
      []
    );
  }),
  addNewRow() {
    this.set("openedItemIndex", this.firebase.realData.length);
    this.firebase.addNewRow({
      name: "Title for new task",
      description: "A dummy description for new task",
      status: 0,
      priority: 0,
    });
  }
});
