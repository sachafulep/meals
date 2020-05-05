import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyALq_rEa5W9RT3YsU50N-0iCxco8Z-caZU",
  authDomain: "meals-e90bc.firebaseapp.com",
  databaseURL: "https://meals-e90bc.firebaseio.com",
  projectId: "meals-e90bc",
  storageBucket: "meals-e90bc.appspot.com",
  messagingSenderId: "202338533042",
  appId: "1:202338533042:web:e71f7eb6ca0c6bd04c53ab",
};

const db = firebase.initializeApp(firebaseConfig).firestore();

export default db;
