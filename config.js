import firebase from 'firebase';
// require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAJ4Bmkcs2rAgvCdWhqAxO3oiCjGJn3P0U",
  authDomain: "my-hospital-project.firebaseapp.com",
  databaseURL: "https://my-hospital-project.firebaseio.com",
  projectId: "my-hospital-project",
  storageBucket: "my-hospital-project.appspot.com",
  messagingSenderId: "675372441162",
  appId: "1:675372441162:web:2183586e1b61c1338550b3"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
