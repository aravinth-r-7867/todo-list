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
    // for(let i=0; i<100; i++){
    //   firebase.database().ref('list/'+ i).set({
    //     "isSelect": false,
    //     "name": 'test' + i,
    //     "description": 'test' + i,
    //     "status": 'test' + i,
    //     "priority": 'test' + i
    // });
    // }
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
        "isSelect": select,
        "name": name,
        "description": description,
        "status": status,
        "priority": priority
    });
  },
  deleteRows(id){
    firebase.database().ref(`list/${id}`).remove();
  },
  deleteAllRows(){
    firebase.database().ref('list').set(null);
  }
});
