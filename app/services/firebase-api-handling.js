import Service from "@ember/service";
import firebase from "firebase";

export default Service.extend({
  setup() {
    firebase.initializeApp({
      apiKey: "AIzaSyCzoqwBuBiLEfHY1KehP5vMDEHwY86oTtc",
      authDomain: "todo-list-ca9c9.firebaseapp.com",
      databaseURL: "https://todo-list-ca9c9-default-rtdb.firebaseio.com",
      projectId: "todo-list-ca9c9",
      storageBucket: "todo-list-ca9c9.appspot.com",
      messagingSenderId: "382852821194",
      appId: "1:382852821194:web:465a357d22134bcb150433",
      measurementId: "G-CHSSMN266Q",
    });
    this.setEventListenerForMainData();
    this.setEventListenerForheaderData();
  },
  realData:null,
  headers:null,
  setEventListenerForMainData(){
    firebase.database().ref('list').on('value', (snapshot)=>{
        this.set('realData', snapshot.val());
    });
  },
  setEventListenerForheaderData(){
    firebase.database().ref('headers').on('value', (snapshot)=>{
        this.set('headers', snapshot.val());
    });
  },
  addNewRow({select, name, description, status, priority}){
      firebase.database().ref('list/'+ this.realData.length).set({
        "select": select,
        "name": name,
        "description": description,
        "status": status,
        "priority": priority
    });
  }
});
