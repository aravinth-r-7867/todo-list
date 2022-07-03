import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormFieldPasswordComponent extends Component {
  @tracked isPwd = true;
  @action togglePasswordField() {
    this.isPwd = !this.isPwd;
  }
}
