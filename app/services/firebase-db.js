import Service from '@ember/service';
import firebase from 'firebase';
import { inject } from '@ember/service';
import defaultdb from './../configurations/firebase-default-db';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class FirebaseDbService extends Service {
  @inject firebaseAuth;

  database = firebase.database();

  userId = '';

  @tracked body = A([]);

  async getUserID() {
    const user = await this.firebaseAuth.isUserLoggedIn();
    this.userId = user.uid;
  }

  async setup() {
    await this.getUserID();
    await this.setUpRoot();
    this.setListenerForBody();
  }

  /**
   * Sets default values if none is set
   */
  async setUpRoot() {
    this.database
      .ref('users')
      .once('value')
      .then((snapshot) => {
        const rootKeys = snapshot.val();
        const hasUserId = rootKeys && rootKeys.hasOwnProperty(this.userId);
        if (!hasUserId) {
          this.database.ref(`users/${this.userId}`).set({
            headers: defaultdb.headers,
            body: defaultdb.body,
          });
        }
      });
  }

  /**
   * Set listeners on data
   */
  async setListenerForBody() {
    this.database.ref(`users/${this.userId}/body`).on('value', (snapshot) => {
      this.body = [...snapshot.val()];
    });
  }

  async addRow(newValues) {
    const newRowIndex = this.body.length;
    this.database
      .ref(`users/${this.userId}/body/${newRowIndex}`)
      .set(newValues);
  }

  async updateRow(value, index) {
    this.database.ref(`users/${this.userId}/body/${index}`).set(value);
  }

  async updateAll(value) {
    this.database.ref(`users/${this.userId}/body`).set(value);
  }
}
