import { setBoard } from "./firebase.js";
import { setModal } from "./firebase.js";

class Player {
  constructor(type){
    this.type = type
  }
  move(target){
    target.classList.add(this.type);
    //checkWinner(this.type);
    setBoard();
    checkWinner(this.type);
    setPlayer();
  }
}
const winner = [[0,1,2], [3,4,5], [6, 7, 8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
const root = document.documentElement;
const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
const innerSquares = document.querySelectorAll('.innerSquare');
const playerMove = document.querySelectorAll('[data-square]');
const modal = document.getElementsByClassName('modal');
let turnX = true;
let modalDisplay = false;
let plays = [];
let winningPlayer = null;

let playerX = new Player('X');
let playerO = new Player('O');

setPlayer();

squares.forEach(square =>{
  square.addEventListener('click', (e)=>{
    if(turnX){
      playerX.move(e.target);
    } else {
      playerO.move(e.target)      
    }
    turnX = !turnX;
    turnX ? board.classList.add('XTurn') : board.classList.remove('XTurn');
    !turnX ? board.classList.add('OTurn') : board.classList.remove('OTurn');
  }, {once: true});
})

function setPlayer(){
    playerMove.forEach(square =>{
      if (square.dataset.square == "taken") return;
      square.dataset.square = turnX ? 'O' : 'X';
    })
}
function checkWinner(type){
  plays = [];
  winningPlayer = null;
  innerSquares.forEach(innerSquare =>{
    plays.push(innerSquare.classList[1] || null)
  })
  let result = test(plays, type)
  winner.forEach(win =>{
    let winner = result.filter((winString)=>{
      return win.includes(winString)
    })
    if(winner.length === 3){
      winningPlayer = type;
    }
  })
  if(winningPlayer === null) return;
  setModal(winningPlayer)
}
function test(plays, type){
  let result = [];
  plays.forEach((player, index) => {
    player === type ? result.push(index) : null
  });
  return result;
}
modal[0].addEventListener('click', ()=>{
  location.reload();
})

export function modalShow(winner){
  modal[0].classList.remove('hidden');
  modal[0].children[0].children[0].textContent = `${winner} Wins!`
}

