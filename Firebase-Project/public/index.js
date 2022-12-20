const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for GPIO states
const stateElement1 = document.querySelector("#state1");
const stateElement2 = document.querySelector("#state2");
const stateElement3 = document.querySelector("#state3");

// Button Elements
const btn1On = document.getElementById('btn1On');
const btn2On = document.getElementById('btn2On');
const btn3On = document.getElementById('btn3On');

// Database path for GPIO states
var dbPathOutput1 = 'board1/outputs/digital/12';
var dbPathOutput2 = 'board1/outputs/digital/13';
var dbPathOutput3 = 'board1/outputs/digital/14';

// Database references
var dbRefOutput1 = firebase.database().ref().child(dbPathOutput1);
var dbRefOutput2 = firebase.database().ref().child(dbPathOutput2);
var dbRefOutput3 = firebase.database().ref().child(dbPathOutput3);

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    //Update states depending on the database value
    let btn1 = false;
    let btn2 = false;
    let btn3 = false;

    let btn1State = true;
    let btn2State = true;
    let btn3State = true;

    dbRefOutput1.on('value', snap => {
        if(snap.val()==1) {
            stateElement1.innerText="ON";
        }
        else{
            stateElement1.innerText="OFF";
            if(btn1State)btn1 = true;
        }
        btn1State = false;
    });
    dbRefOutput2.on('value', snap => {
        if(snap.val()==1) {
            stateElement2.innerText="ON";
        }
        else{
            stateElement2.innerText="OFF";
            if(btn2State)btn2 = true;
        }
        btn2State = false;
    });
    dbRefOutput3.on('value', snap => {
        if(snap.val()==1) {
            stateElement3.innerText="ON";
        }
        else{
            stateElement3.innerText="OFF";
            if(btn3State)btn3 = true;
        }
        btn3State = false;
    });

    // Update database uppon button click

    btn1On.onclick = () =>{
        btn1 ? dbRefOutput1.set(1) : dbRefOutput1.set(0);
        btn1 = !btn1;
    }
    btn2On.onclick = () =>{
        btn2 ? dbRefOutput2.set(1) : dbRefOutput2.set(0);
        btn2 = !btn2;
    }
    btn3On.onclick = () =>{
        btn3 ? dbRefOutput3.set(1) : dbRefOutput3.set(0);
        btn3 = !btn3;
    }
  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}