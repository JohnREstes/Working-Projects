const changeButton = document.querySelector('.changeButton');
const root = document.documentElement;
const backgroundColor = ['--rgb1', '--rgb2', '--rgb3'];

changeButton.addEventListener("click", ()=>{
  backgroundColor.forEach(randomColorRBG);
 });

function randomColorRBG(rgb){
    var colorValue = Math.floor(Math.random() * (255 + 1));
    root.style.setProperty(rgb, colorValue);
}

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if(user){
    //You are logged in
  } else {
    //you are not logged in
  }

});

firebase.auth().signInAnonymously().catch((error) =>{
  var errorCode = error.code;
  var errorMessage = error.message;
  // log out error
  console.log(errorCode, errorMessage);
});


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_v-earqVaFFUGDtVLl_2BJpmB0NUeT_Q",
  authDomain: "multiplayertest-jme.firebaseapp.com",
  databaseURL: "https://multiplayertest-jme-default-rtdb.firebaseio.com",
  projectId: "multiplayertest-jme",
  storageBucket: "multiplayertest-jme.appspot.com",
  messagingSenderId: "978643940788",
  appId: "1:978643940788:web:cadbf245619611602b2ee1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);