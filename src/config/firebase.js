import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbBa4GKy7lwz7Y2FkFHIzFH-3OzvtJfls",
    authDomain: "my-react-vite-sad.firebaseapp.com",
    databaseURL:"https://my-react-vite-sad-default-rtdb.firebaseio.com/",
    projectId: "my-react-vite-sad",
    storageBucket: "my-react-vite-sad.appspot.com",
    messagingSenderId: "455185519040",
    appId: "1:455185519040:web:03f86e1429f3193016b825"
  };


firebase.initializeApp(firebaseConfig);

console.log(firebase.firestore());

export default firebase;
