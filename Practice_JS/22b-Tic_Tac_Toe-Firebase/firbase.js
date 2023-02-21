//Firebase anonymous login and changes to database

const firebaseConfig = {
  apiKey: "AIzaSyB_v-earqVaFFUGDtVLl_2BJpmB0NUeT_Q",
  authDomain: "multiplayertest-jme.firebaseapp.com",
  databaseURL: "https://multiplayertest-jme-default-rtdb.firebaseio.com",
  projectId: "multiplayertest-jme",
  storageBucket: "multiplayertest-jme.appspot.com",
  messagingSenderId: "978643940788",
  appId: "1:978643940788:web:cadbf245619611602b2ee1"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);


function handleChange(){
  //update players[playerId].value = ?
  //then set change
  players[playerId].name = "John";
  playerRef.set(players[playerId]);
}

function initGame(){
  //get all players
  const allPlayersRef = firebase.database().ref('players');

  //callback when allPlayersRef changes
  allPlayersRef.on('value', (snapshot) => {
    //set any player value change to player object
    players = snapshot.val() || {};
    //loop through player object and set dom elements
    Object.keys(players).forEach((key)=>{
      const characterState = players[key];
      let el = playerElements[key];
      console.log(playerElements[key]);
      //update Dom
      //el.queryselector('.name/move') = characterState.name/move
    })

  })
  //callback when new child compared to what your browser knows
  allPlayersRef.on('child_added', (snapshot) => {
    const addedPlayer = snapshot.val();
    const characterElement = document.createElement('div');
    if(addedPlayer.id === playerId.id){
      //this is you
    }
    //render player to screen
    playerElements[addedPlayer.id] = characterElement;
  })


}

  let playerId, playerRef;
  let players = {};
  let playerElements = {};

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      const name = createName();

      playerRef.set({
        id: playerId,
        name,
        turnX,
        modalDisplay

      });

      //removes player on browser close
      playerRef.onDisconnect().remove();

      //begin game
      initGame();

    } else {
      //you are not logged in
    }
  });
  
  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // log out error
      console.log(errorCode, errorMessage);
    });

function randomFromArray(array){
  return array[Math.floor(Math.random() * array.length)];
}
function createName(){
  const prefix = randomFromArray([
    'COOL', 'SUPER', 'HIP', 'SMUG', 'SILKY', 'GOOD', 'RAD', 'DOPE', 'BUFF'
  ])
  const animal = randomFromArray([
    'DOG', 'CAT', 'BEAR', 'LAMB', 'LION', 'FOX', 'RAT', 'GOAT', 'BIRD'
  ])  
  return `${prefix} ${animal}`
}