import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';

export default class TodoAppListHomeComponent extends Component {
    @inject firebaseAuth;
}
