import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TodoAppListHomeComponent extends Component {
  @inject firebaseAuth;
  @inject firebaseDb;

  @tracked newTaskName = '';
  @tracked showAddItemInput = false;
  @tracked showVerifyEmailSentMsg = false;
  @tracked searchTerm = '';

  get isAllTasksSelected() {
    return this.firebaseDb.body.every((item) => item.checkbox.selected);
  }

  set isAllTasksSelected(isAllSelected) {
    let data = this.firebaseDb.body;
    data = data.map((item) => {
      item.checkbox.selected = isAllSelected;
      return item;
    });
    this.firebaseDb.updateAll(data);
  }

  get filteredTasks() {
    const _searchTerm = this.searchTerm.toLowerCase();
    return this.firebaseDb.body.filter(({ task }) => {
      return (
        task.value.toLowerCase().includes(_searchTerm) ||
        task.name.toLowerCase().includes(_searchTerm) ||
        task.description.toLowerCase().includes(_searchTerm)
      );
    });
  }

  constructor(owner, args) {
    super(owner, args);
    this.firebaseDb.setup();
  }

  @action toggleAddItemInput() {
    this.showAddItemInput = !this.showAddItemInput;
  }

  @action addNewRow(event) {
    event.preventDefault();
    const formData = {
      checkbox: {
        name: 'checkbox',
        type: 'checkbox',
        selected: false,
      },
      task: {
        name: 'task_name',
        value: this.newTaskName,
      },
      navigateToTaskPage: {
        show: true,
      },
      id: this.firebaseDb.body.length + 1,
    };
    this.firebaseDb.addRow(formData);
    this.newTaskName = '';
  }

  @action async sendVerifyEmail() {
    await this.firebaseAuth.verifyEmail();
    this.showVerifyEmailSentMsg = true;
    setTimeout(() => {
      this.showVerifyEmailSentMsg = false;
    }, 5000);
  }

  @action selectAll(event) {
    this.isAllTasksSelected = event.target.checked;
  }

  @action selectTask(index, event) {
    const data = this.firebaseDb.body.findBy('id', index);
    data.checkbox.selected = event.target.checked;
    this.firebaseDb.updateRow(data, index);
  }
}
