class Player {
  constructor(type){
    this.type = type
  }
  move(target){
    target.classList.add(this.type);
    setPlayer();
  }
}
const root = document.documentElement;
const board = document.getElementById('board');
const innerSquares = document.querySelectorAll('.square');
const playerMove = document.querySelectorAll('[data-square]');
const modal = document.getElementsByClassName('modal');
let turnX = true;

let playerX = new Player('X');
let playerO = new Player('O');

setPlayer();

innerSquares.forEach(square =>{
  console.log(square);
  square.addEventListener('click', (e)=>{
    if(turnX){
      playerX.move(e.target);
    } else {
      playerO.move(e.target)      
    }
    turnX = !turnX;
    console.log(board.classList.value);
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
