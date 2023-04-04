class Movie {
    constructor(movie, genre, director, releaseYear, rating){
        this.movie = movie,
        this.genre = genre,
        this.director = director,
        this.releaseYear = releaseYear,
        this.rating = rating
    }
    movieInfo(){
        return `
        ${this.movie}, a ${this.genre} film directed by 
        ${this.director} was released in ${this.releaseYear}, It
        received a rating of ${this.rating}.
        `
    }
}

let clue = new Movie ('Clue', 'Comedy', 'IDK', 1998, 3.5);
let everAfter = new Movie ('Ever After', 'Romantic', 'IDK', 1998, 3)

const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];

run.onclick = ()=>{

    display.push(clue.movieInfo());
    display.push(everAfter.movieInfo());

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