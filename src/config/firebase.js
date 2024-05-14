import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACwuEDVAoc2JMI6SlicRuJeawFmOijIus",
  authDomain: "react-vite-sap.firebaseapp.com",
  databaseURL:"https://react-vite-sap-default-rtdb.firebaseio.com/",
  projectId: "react-vite-sap",
  storageBucket: "react-vite-sap.appspot.com",
  messagingSenderId: "216111568345",
  appId: "1:216111568345:web:2cf5b261ccfc5cb9f675c8"
};


firebase.initializeApp(firebaseConfig);

console.log(firebase.firestore());

export default firebase;
