const deck = ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'];

const computerCard = document.getElementById('computerCard');
const playerCard = document.getElementById('playerCard');
const computerCardArea = document.getElementById('computerCardArea');
const playerCardArea = document.getElementById('playerCardArea');
const computerCardStackDiv = document.getElementById('computerCardStack');
const playerCardStackDiv = document.getElementById('playerCardStack');
const computerCount = document.querySelector('[data-computer-card-count]');
const playerCount = document.querySelector('[data-player-card-count]');
const playTurn = document.getElementById('playTurn');
const winner = document.getElementById('winner');
const currentHandCount = document.getElementById('currentHand');
let playerHand, computerHand
let currentHand = [];
let currentRound = 0;
let war = false;

setDecks();

playTurn.addEventListener('click', ()=>{
  if(war){
    for (let i = 0; i <= computerCardArea.children.length + 1 ; i++){
      computerCardArea.removeChild(computerCardArea.lastChild);
      playerCardArea.removeChild(playerCardArea.lastChild);
    }
    war = false
  }
  playGame();
  if(currentRound > 0){
    updateCardCount();
  }
})

function playGame(){
  showCard(computerCard, computerHand);
  showCard(playerCard, playerHand);
  checkWin(currentHand)
}

function checkWin(cardArray){
  let computerPlay = cardToNumber(cardArray[0]);
  let playerPlay = cardToNumber(cardArray[1]);
  if(computerPlay > playerPlay){
    winner.innerText =  'Computer Wins';
    computerHand = [...computerHand, ...currentHand];
  } else if (computerPlay < playerPlay) {
    winner.innerText =  'Player Wins';
    playerHand = [...playerHand, ...currentHand];
  } else { 
    winner.innerText =  'WAR!';  
    playWar();
  }
  currentRound++;
  currentHandCount.innerText = `Hand #${currentRound}`;
  currentHand = [];
}

function playWar(){
  let tempHand = [...currentHand];
  currentHand = [];
  let facedown = true;
  for(let i = 0; i <= 3; i++){
    if(i === 3) facedown = false;
    addWarCard(computerCardArea, computerHand, facedown);
    addWarCard(playerCardArea, playerHand, facedown);
    tempHand = [...currentHand, ...tempHand]
    currentHand = [];
  }
  currentHand = [...tempHand];
  checkWin(currentHand);
  war = true;
}

function addWarCard(area, deck, facedown){
  console.log('play war');
  let tempImg = document.createElement('img');
  tempImg.classList.add('card');
  tempImg.id = "stackedCards";
  if(facedown === true){
    tempImg.src = `./cards/Blue_Back.svg` ;
  } else {
    tempImg.src = `./cards/${deck[0]}.svg` ;
  }

  area.appendChild(tempImg);
  currentHand.push(...deck.splice(0 , 1));
}

function cardToNumber(card){
  if (!parseInt(card)) {
    switch (card.toString().charAt(0)) {
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      case 'A':
        return 14;             
      default:
        break;
    }
  }
  return parseInt(card)
}

function showCard(player, deck){
  if(deck.length === 0){
    let winneringPlayer;
    winneringPlayer = player.id === 'computerCard' ? "Computer" : "Player" 
    winner.innerText =  
    `Game Over, 
    ${winneringPlayer} WINS!`;
    player.remove();
    playTurn.removeEventListener('click');
  } else {
    player.src = `./cards/${deck[0]}.svg`  
    currentHand.push(...deck.splice(0 , 1));
  }
}

function updateCardCount(){
  computerCount.dataset.computerCardCount = computerHand.length;
  playerCount.dataset.playerCardCount = playerHand.length;
}

function setDecks(){
  let shuffledDeck = shuffle(deck);
  let middleIndex = Math.ceil(shuffledDeck.length / 2);
  playerHand = shuffledDeck.splice(0, middleIndex);
  computerHand = shuffledDeck.splice(-middleIndex);
  updateCardCount();
}

//fisher-yates shuffle
function shuffle(array) {
  const newArray = [...array]
  const length = newArray.length
  for (let start = 0; start < length; start++) {
    const randomPosition = Math.floor((newArray.length - start) * Math.random())
    const randomItem = newArray.splice(randomPosition, 1)

    newArray.push(...randomItem)
  }
  return newArray
}

function displayAllCards(player, deck){
  let count = deck.length;
  let pause = setInterval(()=>{
    player.src = `./cards/${deck[count]}.svg`
    count--
    if(count === 0) clearInterval(pause); 
  }, 125);
}