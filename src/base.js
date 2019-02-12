import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAjhSqj8lCnByERf9xc2kLHMPAC-JwbxnQ",
  authDomain: "smaki-azji.firebaseapp.com",
  databaseURL: "https://smaki-azji.firebaseio.com",
  projectId: "smaki-azji",
  storageBucket: "smaki-azji.appspot.com",
  messagingSenderId: "240325562936"
});

const base = Rebase.createClass(firebaseApp.database());

// named export, something that exists as built-in firebase property
export {firebaseApp};
// default export, what we named 'base' above
export default base;