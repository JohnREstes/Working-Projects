class Answer {
  constructor(answer){
    this.answer = answer,
    this.answerLength = answer.length
  }
  buildAnswer(){
    let splitAnswer = this.splitOnSpace();
    for(let j = 0; j < splitAnswer.length; j++){
      for(let i = 0; i < splitAnswer[j].length; i++){
        let tempElement = document.createElement('div');
        tempElement.classList.add('letter');
        tempElement.classList.add('transparent');
        let indLetter = splitAnswer[j].split('');
        tempElement.textContent = indLetter[i].toUpperCase();
        answerGrid.appendChild(tempElement);
      }
      if(splitAnswer[j + 1] == null) return;
      let stringLength = (splitAnswer[j].length + 1 + splitAnswer[j + 1].length)
      if(stringLength > 10){
        let index = 9 - splitAnswer[j].length;
        while(index > 0){
          this.createSpace();  
          index --;       
        }
      }
      this.createSpace();
    }

  }
  splitOnSpace(){
    let answerArray = [];
    return answerArray = this.answer.split(' ');
  }
  createSpace(){
    let tempElement = document.createElement('div');
    tempElement.classList.add('letter');
    tempElement.classList.add('space');
    answerGrid.appendChild(tempElement); 
  }
}

const answerList = ['Eiffle Tower', 'The Colosseum', 'Statue of Liberty', 'Machu Picchu', 'The Acropolis', 'Pyramids of Giza', 'Great Wall of China'];
const hangman = document.querySelectorAll('.man');
const answerGrid = document.querySelector('.answerGrid');
const dataKey = document.querySelectorAll('.key');
const modal = document.querySelector('.modal');
let count = 0;

buildBoard();

function buildBoard(){
  let randomAnswer = Math.floor((Math.random() * answerList.length))
  let newAnswer = new Answer(answerList[randomAnswer]);
  newAnswer.buildAnswer();
}

dataKey.forEach(key =>{
  key.addEventListener('click', (e)=>{
    checkKey(e);
  })
})

function checkKey(e){
  let currentAnswerArray = document.querySelectorAll('.letter'); 
  let modArray = [...currentAnswerArray];
  for(let i = 0; i < currentAnswerArray.length; i++){
    if(currentAnswerArray[i].textContent.toLowerCase() == e.target.dataset.key ){
      currentAnswerArray[i].classList.remove('transparent');
      modArray = modArray.splice(i, 1);
    } 
    e.target.classList.add('correctBtn');
  }
  if(modArray.length == currentAnswerArray.length){
    hangman[count].classList.remove('hidden');
    count++;
    e.target.classList.add('incorrectBtn');
  }
  e.target.classList.add('no-click');
  checkWin();
}
function checkWin(){
  let shown = document.querySelectorAll('.transparent');
  if (shown.length == null || shown.length == 0){
    modal.children[0].children[0].textContent = "You Win!"
    modal.classList.remove('hidden');
  } else if (count == 7){
    modal.children[0].children[0].textContent = "You Lose!"
    modal.classList.remove('hidden');
  }
}
modal.addEventListener('click', ()=>{
  modal.classList.add('hidden');
  location.reload();
})
