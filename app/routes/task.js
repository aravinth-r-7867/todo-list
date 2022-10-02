import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class TaskRoute extends Route {
  @inject firebaseAuth;

  beforeModel() {
    this.firebaseAuth.setup();
  }
  model(params) {
    return +params.task_id;
  }
}
