const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display;
let tiles = 5;
let moves = 0;

run.onclick = ()=>{

    calcMoves(tiles);

    addOutput()
}
clear.onclick = ()=>{
    output.innerHTML = ""
    display = [];
    moves = 0;
    tiles = 7;
}
function addOutput(){
        let temp = document.createElement('li');
        temp.innerText = moves;
        output.appendChild(temp);
}

function calcMoves(tiles){
    if(moves === 0) moves = tiles;
    if (tiles === 1) return moves
    else {
        moves = moves * (tiles - 1); 
        calcMoves((tiles - 1));
    }
}