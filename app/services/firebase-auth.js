import Service from '@ember/service';
import firebase from 'firebase';
import { action } from '@ember/object';

export default class FirebaseAuthService extends Service {
  @action setup() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCzoqwBuBiLEfHY1KehP5vMDEHwY86oTtc',
      authDomain: 'todo-list-ca9c9.firebaseapp.com',
      databaseURL: 'https://todo-list-ca9c9-default-rtdb.firebaseio.com',
      projectId: 'todo-list-ca9c9',
      storageBucket: 'todo-list-ca9c9.appspot.com',
      messagingSenderId: '382852821194',
      appId: '1:382852821194:web:465a357d22134bcb150433',
      measurementId: 'G-CHSSMN266Q',
    });
  }

  @action signIn({ email, password }) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  @action createNewUser({ email, password }) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  @action sendResetPwdEmail(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  @action signOut() {
    firebase.auth().signOut().then(()=>{
      console.log('Sign out successfully');
    });
  }

  @action async isUserLoggedIn() {
    const promise = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
      });
    });
    return await promise;
  }

  @action setUpGoogleAuth() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
}
