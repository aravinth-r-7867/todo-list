import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';
import errCode from '../../configurations/firebase-error-code';

export default class FormSignInComponent extends Component {
    @inject firebaseAuth;
    @inject router;

    @tracked formData = {
        email:'',
        password:''
    };
    @tracked formSubmitMsg = '';
    @tracked showAPILoader = false;
    @tracked inputError = {
        email: false,
        password: false
    };
    @tracked isPwd = true;

    @action togglePasswordField(){
        this.isPwd = !this.isPwd;
    }

    @action async signInUser(event){
        event.preventDefault();
        this.showAPILoader = true;
        let response;
        try {
            response = await this.firebaseAuth.signIn({email:this.formData.email, password:this.formData.password});
        } catch ({code}) {
            this.formSubmitMsg = errCode[code];
            this.setInputAsInvalid(code);
        } finally {
            this.showAPILoader = false;
        }
        response && this.router.transitionTo('tasks');
    }

    @action closeFormSubmitMsg(){
        this.formSubmitMsg = '';
    }

    @action clearCustomValidation(event){
        event.target.setCustomValidity('');
    }

    setInputAsInvalid(errCode){
        const inputMapping = {
            'auth/wrong-password': 'input[name="password"]',
            'auth/user-not-found': 'input[name="email"]'
        };
        const inputElem = document.querySelector('#loginForm').querySelector(inputMapping[errCode]);
        inputElem && inputElem.setCustomValidity(this.formSubmitMsg);
    }

}
