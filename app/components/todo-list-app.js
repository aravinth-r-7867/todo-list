import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ["todo-list-addon-main-wrapper"],
  firebase: service("firebase-api-handling"),
  isAddRow: false,
  isSelectAllRows: false,
  init() {
    this._super(...arguments);
    this.firebase.setup();
    this.set("newRowData", {
      name: "",
      description: "",
      priority: "",
      status: "",
    });
  },
  mainData: computed("firebase.realData", function () {
    return (
      (this.firebase.realData &&
        this.firebase.realData.filter((item) => item)) ||
      []
    );
  }),
  headersData: computed("firebase.headers", function () {
    return this.firebase.headers;
  }),
  addRow() {
    if (!this.newRowData.name) {
      alert("Name cannot be empty");
      return;
    }
    this.firebase.addNewRow(this.newRowData);
    this.set("newRowData", {
      name: "",
      description: "",
      priority: "",
      status: "",
    });
  },
  deleteRows() {
    this.firebase.realData.forEach((item, index) => {
      item.isSelect && this.firebase.deleteRows(index);
    });
  },
  deleteAllRows(){
    this.isSelectAllRows && this.firebase.deleteAllRows();
  }
});
