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
            cardList.push(new FlashCard(id, item));
            break;
        case "remove":
            cardList = grocList.filter(e => e.id !== id);
            break;
        case "edit":
            cardList = grocList.filter(e => e.id !== id);
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
function build(randID, text){
    if(randID == '') {
        randID = randomID()
        mutateLocSto(randID, text, "add");
    }
    let newItemDiv = document.createElement("div");
    newItemDiv.className = 'item';
    newItemDiv.id = `${randID}item`;
    var todoListString = `            
                <span class="indvidualItem">
                    <p class="itemText" id="${randID}text">${text}</p>
                    <input type="text" class="inputInactive inputItem" placeholder="">
                    <span class="right">
                        <span onclick=buttonOp(this) data-name="approve" class="material-symbols-rounded inactive" id="${randID}approve">offline_pin</span>
                        <span onclick=buttonOp(this) data-name="edit" class="material-symbols-rounded blue" id="${randID}edit">edit_note</span>
                        <span onclick=buttonOp(this) data-name="delete" class="material-symbols-rounded red" id="${randID}delete">cancel</span>
                    </span>
                </span>
            </div>
    `
    todoItems.appendChild(newItemDiv);
    todoItems.lastChild.innerHTML = todoListString
    return 
}