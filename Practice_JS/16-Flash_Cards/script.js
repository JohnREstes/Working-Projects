class FlashCard {
    constructor(question, answer, randID) {
        this.question = question;
        this.answer = answer;
        this.randID = randID;
    }
    addCard(){
        console.log(this.randID + " ok");

    }
    deleteCard(){

    }
    flipCard(){

    }
}

const add = document.querySelector('[data-add]');
const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const close = document.querySelector('[data-close]');
const save = document.querySelector('[data-save]');
const cardContainer = document.querySelector('[data-card-container]');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');

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
    createNewCard();
})
function createNewCard(){
    let randID = self.crypto.randomUUID();
    let card = new FlashCard(questionText, answerText, randID);
    console.log(card);
    card.addCard();
}
function checkLocSto(){
    let storage = mutateLocSto('','', "retrieve");
    if(storage !== null){
        storage.forEach(e => {
            build(e.id, e.item)
        });
    } else {
    window.localStorage.setItem('flashCards', JSON.stringify([]));
    }

}

checkLocSto();

function mutateLocSto(id, item = '', operation){
    let cardList = JSON.parse(window.localStorage.getItem('flashCards'));
    switch(operation){
        case "add":
            cardList.push(new FlashCard(id, item));
            break;
        case "remove":
            cardList = grocList.filter(e => e.id !== id);
            break;
        case "edit":
            cardList = cardList.filter(e => e.id !== id);
            cardList.push(new FlashCard(id, item));
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
function build(randID, question, answer){
    if(randID == '') {
        randID = randomID()
        mutateLocSto(randID, text, "add");
    }
    let newCardDiv = document.createElement("div");
    newCardDiv.className = 'cardContainer';
    newCardDiv.id = `${randID}cardContainer`;
    var todoListString = `            
    <h2 class="text" id="${randID}Text">${question}</h2>
    <h2 class="text hidden" id="${randID}Text">${answer}</h2>
    <p class="showHide" id="${randID}ShowHide">Show/Hide Answer</p>
    <button class="edit" data-edit id="${randID}Edit">Edit</button>
    <button class="delete" data-delete id="${randID}Delete">Delete</button>
    `
    todoItems.appendChild(newCardDiv);
    todoItems.lastChild.innerHTML = todoListString
    return 
}
function randomID(){
    return self.crypto.randomUUID();
}