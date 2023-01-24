class FlashCard {
    constructor(question, answer, randID) {
        this.question = question;
        this.answer = answer;
        this.randID = randID;
    }
}

const add = document.querySelector('[data-add]');
const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const close = document.querySelector('[data-close]');
const save = document.querySelector('[data-save]');
const cards = document.querySelector('[data-cards]');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
let editingCard;

add.addEventListener('click', ()=> {
    modal.classList.add('show');
})
close.addEventListener('click', ()=>{
    modal.classList.remove('show');  
})
modal.addEventListener('click', (e)=>{
    if(e.target.dataset.modal === "") modal.classList.remove('show');
})
save.addEventListener('click', ()=>{
    if(questionText.value === '' || answerText.value === ''){
        errorMessage();
        return;
    }
    if(editingCard !== undefined) {
        editingCard[0].question = questionText.value;
        editingCard[0].answer = answerText.value;
        mutateLocSto(editingCard, 'saveEdit');
    } else createNewCard();
    modal.classList.remove('show');
    questionText.value = '';
    answerText.value = '';
})
function createNewCard(){
    let randID = self.crypto.randomUUID();
    let card = new FlashCard(questionText.value, answerText.value, randID);
    mutateLocSto(card, 'add');
    build(card);
}
function checkLocSto(){
    let storage = mutateLocSto('', "retrieve");
    if(storage !== null){
        storage.forEach(card => {
            build(card);
        });
    } else {
    window.localStorage.setItem('flashCards', JSON.stringify([]));
    }

}
checkLocSto();

function mutateLocSto(card, operation){
    console.log("Mutate");
    let cardList = JSON.parse(window.localStorage.getItem('flashCards'));
    switch(operation){
        case "add":
            cardList.push(card);
            break;
        case "Delete":
            console.log(card.randID + " DELETE");
            cardList = cardList.filter(e => e.randID !== card.randID);
            location.reload()
            break;
        case "Edit":
            let cardEdit =  cardList.filter(e => e.randID == card.randID);
            editCard(cardEdit);
            break;
        case "saveEdit":
            console.log('save edit')
            console.log(editingCard[0].randID);
            let cardIndex = cardList.indexOf(editingCard[0].randID);
            console.log(cardIndex);
            break;
        case "ShowHide":
            let currentQuestion = document.getElementById(`${card.randID}Question`);
            let currentAnswer = document.getElementById(`${card.randID}Answer`);
            currentQuestion.classList.toggle('hide');
            currentAnswer.classList.toggle('hide');
            break;
        case "retrieve":
            return cardList;
        case "clear":
            window.localStorage.clear('flashCards');
            break;
        default:
            alert("something is wrong");
            break;
    }
    window.localStorage.setItem('flashCards', JSON.stringify(cardList));
    console.log(JSON.parse(window.localStorage.getItem('flashCards')));
}
function build(card){
    let newCardDiv = document.createElement("div");
    newCardDiv.className = 'cardContainer';
    newCardDiv.id = `${card.randID}cardContainer`;
    var todoListString = `            
    <h2 class="text" id="${card.randID}Question">${card.question}</h2>
    <h2 class="text hide" id="${card.randID}Answer">${card.answer}</h2>
    <p class="showHide" id="${card.randID}ShowHide">Show/Hide Answer</p>
    <button class="edit" id="${card.randID}Edit">Edit</button>
    <button class="delete" id="${card.randID}Delete">Delete</button>
    `
    cards.appendChild(newCardDiv);
    cards.lastChild.innerHTML = todoListString;
    newEventListener(card, 'Edit');
    newEventListener(card, 'Delete');
    newEventListener(card, 'ShowHide');
    return 
}
function newEventListener(card, type){
    let newButton = document.getElementById(`${card.randID}${type}`);
        newButton.addEventListener('click', ()=>{
            mutateLocSto(card, type);
        })
}
function editCard(card){
    modal.classList.add('show');
    questionText.value = card[0].question;
    answerText.value = card[0].answer;
    editingCard = card;
}
function errorMessage(){
    console.log('error');
}