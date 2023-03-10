const deck = ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'];

const computerCard = document.getElementById('computerCard');
const playerCard = document.getElementById('playerCard');
const computerCount = document.querySelector('[data-computer-card-count]');
const playerCount = document.querySelector('[data-player-card-count]');
const playTurn = document.getElementById('playTurn');
let playerHand, computerHand
let currentHand = [];
let reg = /\d/;

setDecks();

playTurn.addEventListener('click', ()=>{
  playGame();
})
function playGame(){
  showCard(computerCard, computerHand);
  showCard(playerCard, playerHand);
  updateCardCount();
  checkWin()
}

function checkWin(){
  let computerPlay = cardToNumber(currentHand[0]);
  let playerPlay = cardToNumber(currentHand[1]);
  console.log(computerPlay, playerPlay); 
}

function cardToNumber(card){
  if (!parseInt(card.toString().charAt(0))) {
    console.log(card, "run NaN");
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
  player.src = `./cards/${deck[0]}.svg`  
  currentHand.push(deck.splice(0 , 1));
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