const options = document.querySelectorAll('.options');
const computerMoves = document.getElementById('computerMoves');
const reset = document.getElementById('reset');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const winner = document.getElementById('whoWon');
const WINNING_COMBO = [['scissorsImg', 'paperImg', 'cuts'], ['paperImg', 'rockImg', 'covers'], ['rockImg', 'lizardImg', 'crushes'], ['lizardImg', 'spockImg', 'poisons'], ['spockImg', 'scissorsImg', 'smashes'], ['scissorsImg', 'lizardImg', 'decapitates'], ['lizardImg', 'paperImg', 'eats'], ['paperImg', 'spockImg', 'disproves'], ['spockImg', 'rockImg', 'vaporizes'], ['rockImg', 'scissorsImg', 'crushes']];
const IMG_SRC = ["./img/Rock.svg", "./img/Paper.svg", "./img/Scissors.svg", "./img/Lizard.svg", "./img/Spock.svg"];

options.forEach(option =>{
    option.addEventListener('click', initGame);
})
function initGame(e){
    console.log(e);
    removeClick();
    computerRandom();
    checkWin(target.target.id);
}
function checkWin(target){
    console.log(target);
}
function computerRandom(){
    let random = Math.floor(Math.random() * 5);
    let tempImg = document.createElement('img');
    tempImg.id = "computerChoice" 
    tempImg.src = IMG_SRC[random];
    computerMoves.appendChild(tempImg);
}
function removeClick(){
    options.forEach(option =>{
        option.removeEventListener ('click', initGame);
    })
}