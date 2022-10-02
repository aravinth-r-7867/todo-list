import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export default class TaskPageComponent extends Component {
  @inject firebaseDb;

  @tracked showDescEditor = false;
  @tracked showTitleEditor = false;

  constructor(owner, args) {
    super(owner, args);
    this.firebaseDb.setup();
  }

  get taskData() {
    return this.firebaseDb.body.findBy('id', this.args.id);
  }

  @action toggleDescEditor() {
    this.showDescEditor = !this.showDescEditor;
  }

  @action toggleTitleEditor() {
    this.showTitleEditor = !this.showTitleEditor;
  }

  @action openTitleEditor() {
    this.toggleTitleEditor();
    schedule('afterRender', this, () => {
      document.querySelector('#titleEditor').focus();
    });
  }

  @action saveTitle() {
    this.firebaseDb.updateRow(this.taskData, this.args.id);
    this.toggleTitleEditor();
  }

  @action updateDesc(event) {
    event.preventDefault();
    this.firebaseDb.updateRow(this.taskData, this.args.id);
    this.toggleDescEditor();
  }
}
