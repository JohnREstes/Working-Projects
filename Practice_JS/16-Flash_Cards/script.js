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
    if(storage.length > 0){
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
            cardList.push(new List_Item(id, item));
            break;
        case "remove":
            cardList = grocList.filter(e => e.id !== id);
            break;
        case "edit":
            cardList = grocList.filter(e => e.id !== id);
            cardList.push(new List_Item(id, item));
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