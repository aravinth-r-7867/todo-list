import Component from '@glimmer/component';
import { inject } from '@ember/service';

export default class FormGoogleAuthComponent extends Component {
    @inject firebaseAuth;
}
