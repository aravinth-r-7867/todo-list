import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tasks');
  this.route('sign-up');
  this.route('sign-in');
  this.route('account');
  this.route('reset-password');
  this.route('verify-email');
});

export default Router;
