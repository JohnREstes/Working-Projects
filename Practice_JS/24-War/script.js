const deck = ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD']

const computerCard = document.getElementById('computerCard');
const playerCard = document.getElementById('playerCard');
let playerHand, computerHand;

function changeCard(player, deck){
  let count = deck.length;
  let pause = setInterval(()=>{
    console.log(count);
    player.src = `./cards/${deck[count]}.svg`
    count--
    if(count === 0) clearInterval(pause); 
  }, 125);
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
function setDecks(){
  let shuffledDeck = shuffle(deck);
  let middleIndex = Math.ceil(shuffledDeck.length / 2);
  playerHand = shuffledDeck.splice(0, middleIndex);
  computerHand = shuffledDeck.splice(-middleIndex);
  console.log(playerHand);
  console.log(computerHand);
  changeCard(computerCard, computerHand);
  changeCard(playerCard, playerHand);
}

setDecks();