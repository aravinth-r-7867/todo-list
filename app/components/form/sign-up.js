import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import errCode from '../../configurations/firebase-error-code';

export default class FormSignUpComponent extends Component {
  @inject firebaseAuth;
  @inject router;

  @tracked formData = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  @tracked showAPILoader = false;
  @tracked formSubmitMsg = '';

  @action clearCustomValidation(event) {
    if (
      event.target.name == 'password' ||
      event.target.name == 'confirm-password'
    ) {
      // TODO: Use modifiers to handle this issue
      const formElement = document.querySelector('#createUserForm');
      formElement
        .querySelector('input[name="confirm-password"]')
        .setCustomValidity('');
      formElement.querySelector('input[name="password"]').setCustomValidity('');
    }
    event.target.setCustomValidity('');
  }

  @action closeFormSubmitMsg() {
    this.formSubmitMsg = '';
  }

  @action async createNewUser(event) {
    event.preventDefault();
    if (this.formData.password != this.formData.confirmPassword) {
      const code = 'auth/password-no-match';
      this.formSubmitMsg = errCode[code];
      this.setInputAsInvalid(code);
    } else {
      this.showAPILoader = true;
      let response;
      try {
        response = await this.firebaseAuth.createNewUser({
          email: this.formData.email,
          password: this.formData.password,
        });
      } catch ({ code }) {
        this.formSubmitMsg = errCode[code];
        this.setInputAsInvalid(code);
      } finally {
        this.showAPILoader = false;
      }
      response && this.router.transitionTo('tasks');
    }
  }

  setInputAsInvalid(errCode) {
    const inputMapping = {
      'auth/email-already-in-use': 'input[name="email"]',
      'auth/password-no-match': 'input[name="confirm-password"]',
    };
    const inputElem = document
      .querySelector('#createUserForm')
      .querySelector(inputMapping[errCode]);
    inputElem && inputElem.setCustomValidity(this.formSubmitMsg);
  }
}
