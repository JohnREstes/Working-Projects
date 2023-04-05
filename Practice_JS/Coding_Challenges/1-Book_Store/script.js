class Book {
    constructor(title, author, ISBN, numCopies){
        this.title = title,
        this.author = author,
        this.ISBN = ISBN,
        this.numCopies = numCopies
    }
    getAvailabilities(){
        if(this.numCopies === 0) return 'out of stock'
        else if (this.numCopies < 10) return 'low stock'
        else return 'in stock'
    }
    sell(numSold = 1){
        this.numCopies -=numSold;
    }
    restock(numCopies = 5){
        this.numCopies += numCopies;
    }
}
class TechnicalBook extends Book {
    constructor(title, author, ISBN, numCopies, edition){
        super(title, author, ISBN, numCopies);
        this.edition = edition;
    }
    getEdition(){
        return `The current version of this book is ${this.edition}.`
    }
}

let clue = new Book('Clue', 'The Butler', 12345678, 20);
let coding = new TechnicalBook('JavaScript', 'Yo Yo Mama', 12346789, 18, 1.2)

const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];

run.onclick = ()=>{
    display.push(clue.title);
    display.push(clue.author)
    display.push(clue.ISBN)
    display.push(clue.numCopies)

    display.push(clue.getAvailabilities());
    clue.sell();
    display.push(clue.getAvailabilities());
    clue.sell(10);
    display.push(clue.getAvailabilities());
    clue.restock()
    display.push(clue.getAvailabilities());
    display.push(coding.getEdition());

    addOutput();
}
clear.onclick = ()=>{
    output.innerHTML = ""
    display = [];
}
function addOutput(){
    for(item of display){
        let temp = document.createElement('li');
        temp.innerText = item;
        output.appendChild(temp);
    }
}