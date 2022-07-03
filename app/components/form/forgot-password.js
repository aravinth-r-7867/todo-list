import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';

export default class FormForgotPasswordComponent extends Component {
  @inject firebaseAuth;
  @inject router;

  @tracked formData = {
    email: '',
  };
  @tracked showAPILoader = false;
  @tracked formSubmitMsg = '';
  @tracked resetEmailSent = '';

  @action closeFormSubmitMsg() {
    this.formSubmitMsg = '';
  }

  @action clearCustomValidation(event) {
    event.target.setCustomValidity('');
  }

  @action async sendResetEmail(event) {
    event.preventDefault();
    this.showAPILoader = true;
    try {
      await this.firebaseAuth.sendResetPwdEmail(this.formData.email);
    } catch ({ code, message }) {
      this.formSubmitMsg = message;
      const inputElem = document
        .querySelector('#ResetPwdForm')
        .querySelector('input[name="email"]');
      inputElem && inputElem.setCustomValidity(this.formSubmitMsg);
    } finally {
      this.showAPILoader = false;
      this.formSubmitMsg = '';
      this.resetEmailSent = 'Reset password email is sent!';
    }
  }
}
