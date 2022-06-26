import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SignInFormGcComponent extends Component {
  @inject firebaseAuth;
  @inject router;

  @tracked showSignInForm = true;
  @tracked showForgotPwdForm = false;

  constructor(owner, args) {
    super(owner, args);
    this.firebaseAuth.setup();
    this.isCurrentUser();
    // this.firebaseAuth.signIn();
  }

  async isCurrentUser() {
    this.currentUser = await this.firebaseAuth.isUserLoggedIn();
    this.currentUser && this.router.transitionTo('tasks');
  }

  @action signInViaGoogle() {
    this.firebaseAuth.setUpGoogleAuth();
  }
}
