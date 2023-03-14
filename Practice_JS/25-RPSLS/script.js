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
    let win = ''
    if(computerPlay === playerPlay){
        console.log("Tie");
        return;
    }
    for(option of WINNING_COMBO){
        if(option.includes(computerPlay) && option.includes(playerPlay)) win = option;
    }
    console.log(computerPlay, playerPlay);
    console.log(win);
    if(computerPlay === win[0]){
        console.log(`Computer Wins!  ${win[0].substring(0, win[0].length - 3)} ${win[2]} ${win[1].substring(0, win[1].length - 3)}`);
    } else {
        console.log(`Player Wins!  ${win[0].substring(0, win[0].length - 3)} ${win[2]} ${win[1].substring(0, win[1].length - 3)}`);
    }
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
