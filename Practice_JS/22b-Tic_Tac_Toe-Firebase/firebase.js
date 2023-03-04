import { modalShow } from "./script.js";
import { turnX } from "./script.js";

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

export function setBoard(){
  playerMoves = [];
  currentBoard.forEach((position) =>{
    if(position.classList.length > 1){
      playerMoves.push(position.classList[1])
    } else playerMoves.push("");
    
  })
  boardRef.update({
    playerMoves,
  });
}
export function setModal(winner){
  boardRef.update({
    modal: true,
    winner
  }); 
}
export function clearBoard(){
  boardRef.set({
    playerMoves: [],
    modal: false,
    winner: "",
    turnX
  }); 
}
export let playerState;
function initGame(){
  setBoard();
  //get all players
  const allPlayersRef = firebase.database().ref('players');
  const allBoardRef = firebase.database().ref('board');

  //callback when allPlayersRef changes
  allPlayersRef.on('value', (snapshot) => {
    //set any player value change to player object
    players = snapshot.val() || {};
    let firstPlayer = true;
    playerState;
    Object.keys(players).forEach((key)=>{
      playerState = players[key];
      if(playerState.piece === "X") firstPlayer = false;
    })
    if(firstPlayer){
      playerRef.update({
        piece: 'X'
      });
    }
  })

    //callback when allBoardRef changes
  allBoardRef.on('value', (snapshot) => {
    //set any player value change to player object
    board = (snapshot.val() || {});
    //loop through player object and set dom elements
    console.log(board.playerMoves);
    if(board.playerMoves === undefined) return;
    board.playerMoves.forEach((move, index)=>{
      if(move === "")return;
      currentBoard[index].classList.add(move);
    })
    //if(board.)
    if(board.winner !== ""){
      modalShow(board.winner);
    }
  })
}

  export let playerId;
  export let playerRef;
  export let players = {};
  let boardRef = {};
  let board;
  let currentBoard = document.querySelectorAll('.innerSquare');
  let playerMoves = [];

  let name = createName();

  firebase.auth().onAuthStateChanged((user) => {
    console.log(`User ${user.uid} is signed-in`);
    if (user) {
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);
      boardRef = firebase.database().ref(`board/`);

      console.log((firebase.database().ref('board'))).exists();

      playerRef.set({
        id: playerId,
        name,
        piece: 'O'
      });

      boardRef.set({
        playerMoves,
        modal: false,
        winner: "",
        turnX
      });

      //removes player on browser close
      playerRef.onDisconnect().remove();
      boardRef.onDisconnect().remove();

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
      // error message
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