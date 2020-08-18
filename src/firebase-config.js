import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAMcv6X6SS-0uV2lNubSwd7-S0b9sLJLL0",
    authDomain: "fir-img-upload-903e0.firebaseapp.com",
    databaseURL: "https://fir-img-upload-903e0.firebaseio.com",
    projectId: "fir-img-upload-903e0",
    storageBucket: "fir-img-upload-903e0.appspot.com",
    messagingSenderId: "976284158037",
    appId: "1:976284158037:web:6249f000945d299085acdc",
    measurementId: "G-38RTP2R6WJ"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 

  var storage = firebase.storage();
  console.log(firebase);

  export {
      storage, fire as default
  }