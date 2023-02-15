class Answer {
  constructor(answer){
    this.answer = answer,
    this.answerLength = answer.length
  }
  buildAnswer(){
    let splitAnswer = this.splitOnSpace();
    console.log(splitAnswer[0]);
    for(let j = 0; j < splitAnswer.length; j++){
      for(let i = 0; i < splitAnswer[j].length; i++){
        let tempElement = document.createElement('div');
        tempElement.classList.add('letter');
        let indLetter = splitAnswer[j].split('');
        tempElement.textContent = indLetter[i].toUpperCase();
        answerGrid.appendChild(tempElement);
      }
      let tempElement = document.createElement('div');
      tempElement.classList.add('letter');
      tempElement.classList.add('space');
      answerGrid.appendChild(tempElement); 
    }

  }
  splitOnSpace(){
    let answerArray = [];
    return answerArray = this.answer.split(' ');
  }
}

const answerList = ['Eiffle Tower', 'The Colosseum', 'Statue of Liberty', 'Machu Picchu', 'The Acropolis', 'The Taj Mahal', 'Pyramids of Giza', 'Great Wall of China'];
const hangman = document.querySelectorAll('.man');
const answerGrid = document.querySelector('.answerGrid');
const dataKey = document.querySelectorAll('.key');

buildBoard();

dataKey.forEach(key =>{
  key.addEventListener('click', (e)=>{
    console.log(e.target.dataset.key);
  })
})

function buildBoard(){
  let randomAnswer = Math.floor((Math.random() * answerList.length))
  let newAnswer = new Answer(answerList[randomAnswer]);
  newAnswer.buildAnswer();
}