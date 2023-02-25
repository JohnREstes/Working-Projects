//Firebasesetup

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


let index = 0
export function handleChange(){
  //update players[playerId].value = ?
  //then set change
  index ++;
  
  console.log(players);
 
/*  if(index === 3){
    players[playerId].modal = true 
  } else {
    players[playerId].modal = false
  };
  console.log(players[playerId].modal);
  console.log(index)
  if(index === 3) index = 0;   
  playerRef.update(players[playerId]);
*/
}
export function setBoard(){
  playerMoves = [];
  currentBoard.forEach(position =>{
    playerMoves.push(position.classList.value);
  })
  console.log(playerMoves);
  boardRef.update({
    playerMoves,
  });
}

function initGame(){
  setBoard();
  //get all players
  const allPlayersRef = firebase.database().ref('players');
  const allBoardRef = firebase.database().ref('board');

  //callback when allPlayersRef changes
  allPlayersRef.on('value', (snapshot) => {
    //set any player value change to player object
    players = snapshot.val() || {};
    //loop through player object and set dom elements
    Object.keys(players).forEach((key)=>{
      playerState = players[key];
      let el = playerElements[key];
      if(playerState.id == playerId){
          let text = document.querySelector('.text');
          text.textContent = playerState.color;
          }
      let modalShown = document.querySelector('.modal');
          console.log(playerState);
      playerState.modal ? modalShown.classList.remove('hidden') : modalShown.classList.add('hidden');

      //update Dom
      //el.queryselector('.name/move') = characterState.name/move
    })
  })

    //callback when allBoardRef changes
  allBoardRef.on('value', (snapshot) => {
    //set any player value change to player object
    board = snapshot.val() || {};
    //loop through player object and set dom elements
    console.log('board value change');
    console.log(board)
    Object.keys(board).forEach((key)=>{
      console.log(key);
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

  let playerId;
  let playerRef;
  let players = {};
  let playerElements = {};
  let boardRef = {};
  let board;
  let currentBoard = document.querySelectorAll('.innerSquare');
  let playerMoves = [];


  export let playerState;

  firebase.auth().onAuthStateChanged((user) => {
    console.log(`User ${user.uid} is signed-in`);
    if (user) {
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);
      boardRef = firebase.database().ref(`board/`);

      const name = createName();

      playerRef.set({
        id: playerId,
        name
      });

      boardRef.set({
        playerMoves,
        modal: false
      });

      //removes player on browser close
      playerRef.onDisconnect().remove();

      //begin game
      initGame();

    } else {
      console.log('You are not logged in');
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