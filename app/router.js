import EmberRouter from '@ember/routing/router';
import config from 'todo-list/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('tasks');
  this.route('sign-up');
  this.route('sign-in');
  this.route('account');
  this.route('reset-password');
  this.route('verify-email');
});
