import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class TasksRoute extends Route {
  @inject router;
  @inject firebaseAuth;

  async beforeModel() {
    this.firebaseAuth.setup();
    this.currentUser = await this.firebaseAuth.isUserLoggedIn();
    this.currentUser ?? this.router.transitionTo('index');
  }
}
