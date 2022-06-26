import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { firbaseErrorCodeTranslations } from './../configurations/firebase-error-code';

export default Component.extend({
  _firebase: service('firebase-api-handling'),
  router: service(),
  /**
   * Variables for form control
   */
  showLoginForm: true,
  showResetPwdForm: false,

  classNames: ['sign-in-wrapper'],
  errMsg: false,
  pwdErrMsg: false,
  successMsgOnResetEmailLink: '',
  init() {
    this._super(...arguments);
    /**
     * Initialize firebase app
     */
    this._firebase.setup();

    /**
     * Redirect to tasks page if user is logged in
     */
    this._firebase
      .isExistingUser()
      .then(() => {
        // this.router.transitionTo('tasks');
      })
      .catch(() => {
        this.router.transitionTo('/');
      });
  },
  /**
   * Account management methods
   */
  createNewUser() {
    this.set('errMsg', '');
    const targetFields = ['email', 'password', 'confirmPassword'];
    const { email, password, confirmPassword } = this.getFormInputs(
      'createUserForm',
      targetFields
    );
    const isPwdsNoMatch = password != confirmPassword ? true : false;
    this.set('pwdErrMsg', isPwdsNoMatch ? 'Passwords do not match' : false);
    if (isPwdsNoMatch) {
      return;
    }
    this._firebase
      .createNewUser(email, password)
      .then(() => {
        this.router.transitionTo('verify-email');
      })
      .catch(({ code, message }) => {
        this.set('errMsg', firbaseErrorCodeTranslations[code]);
        if (code == 'auth/email-already-in-use') {
          this.isEmailExists(email);
        }
      });
  },
  signInUser() {
    const { email, password } = this.getFormInputs('loginForm', [
      'email',
      'password',
    ]);
    this._firebase
      .signInUser(email, password)
      .then(({ emailVerified }) => {
        this.router.transitionTo(emailVerified ? 'tasks' : 'verify-email');
      })
      .catch(({ code, message }) => {
        this.set('errMsg', firbaseErrorCodeTranslations[code]);
      });
  },
  sendResetEmail() {
    const { email } = this.getFormInputs('ResetPwdForm', ['email']);
    this._firebase
      .sendResetEmail(email)
      .then(() => {
        // Password reset email sent
        this.set(
          'successMsgOnResetEmailLink',
          'Reset password link has been sent to the email address'
        );
      })
      .catch(() => {
        // Error while sending password reset email goes here
      });
  },

  /**
   * Util methods
   */
  isEmailExists(alreadyExistingEmail) {
    if (!alreadyExistingEmail) return;
    const emailElem = this.element.querySelector('input[name="email"]');
    const inputEmail = emailElem.value;
    emailElem.setCustomValidity(
      alreadyExistingEmail && alreadyExistingEmail == inputEmail
        ? 'Email already exists'
        : ''
    );
  },
  isSamePwd() {
    const confirmPwdElem = this.element.querySelector(
      "input[name='confirmPassword']"
    );
    const pwd = this.element.querySelector("input[name='password']").value;
    const confirmPwd = confirmPwdElem.value;
    const _errMsg = pwd != confirmPwd ? "Password doesn't match" : '';
    confirmPwdElem.setCustomValidity(_errMsg);
    this.set('errMsg', _errMsg);
  },
  getFormInputs(formId, targetFields) {
    const formdata = new FormData(document.forms[formId]);
    let resultInputs = {};
    targetFields.forEach((field) => {
      resultInputs[field] = formdata.get(field);
    });
    return resultInputs;
  },
});
