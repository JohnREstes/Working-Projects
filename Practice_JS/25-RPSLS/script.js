const options = document.querySelectorAll('.options');
const computerMoves = document.getElementById('computerMoves');
const reset = document.getElementById('reset');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const winner = document.getElementById('whoWon');
const WINNING_COMBO = [['scissorsImg', 'paperImg', 'cuts'], ['paperImg', 'rockImg', 'covers'], ['rockImg', 'lizardImg', 'crushes'], ['lizardImg', 'spockImg', 'poisons'], ['spockImg', 'scissorsImg', 'smashes'], ['scissorsImg', 'lizardImg', 'decapitates'], ['lizardImg', 'paperImg', 'eats'], ['paperImg', 'spockImg', 'disproves'], ['spockImg', 'rockImg', 'vaporizes'], ['rockImg', 'scissorsImg', 'crushes']];
const IMG_SRC = ["./img/Rock.svg", "./img/Paper.svg", "./img/Scissors.svg", "./img/Lizard.svg", "./img/Spock.svg"];

options.forEach(option =>{
    option.addEventListener('click', initGame)
})
function initGame(e){
    computerRandom();
    checkWin(e);
    removeAllClickEvents();
}
function checkWin(target){
    let computerPlay = computerMoves.children[0].id;
    let playerPlay = target.target.id;

    console.log(computerPlay, playerPlay);
}
function computerRandom(){
    let random = Math.floor(Math.random() * 5);
    let tempImg = document.createElement('img');
    let tempId = IMG_SRC[random];
    tempId = tempId.substring(6, tempId.length);
    tempId = tempId.substring(0, tempId.length - 4);    
    tempId = tempId.toLowerCase() + "Img";
    tempImg.id = tempId;
    tempImg.src = IMG_SRC[random];
    computerMoves.appendChild(tempImg);
}
function removeAllClickEvents(){
    options.forEach(option =>{
        option.removeEventListener('click', initGame);
    })
}
