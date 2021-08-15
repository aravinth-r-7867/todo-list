import Component from '@ember/component';
import { inject as service } from "@ember/service";

export default Component.extend({
    _firebase: service("firebase-api-handling"),
    router: service(),
    classNames: ["sign-in-wrapper"],
    isVerifyEmailLinkSent:false,
    userEmail:'',
    init() {
        this._super(...arguments);
        /**
         * Initialize firebase app
         */
        this._firebase.setup();
        this._firebase
        .isExistingUser()
        .then(({emailVerified}) => {
            emailVerified && this.router.transitionTo('tasks');
        })
        .catch(() => {
            this.router.transitionTo("/");
        });
    },
    sendVerifyEmailLink(){
        this._firebase.sendVerifyEmailLink();
        this.set('isVerifyEmailLinkSent', true);
        this._firebase
        .isExistingUser()
        .then(({email}) => {
            this.set('userEmail', email);
        })
        .catch(() => {
          //User is not logged in
        });
    }
});
