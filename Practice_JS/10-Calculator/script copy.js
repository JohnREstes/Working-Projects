const grid = document.querySelectorAll('.grid');
var countDigit = 0, countOperator = ""; 
var digit1 = null, digit2 = null, digit3 = null, operator1 = null, operator2 = null;
var problem = [0];
const decimal = /[0-9]+\./;
var float = false;
var floatPostition = 0;
var currentPosition = 0;

grid.forEach(item => {
    item.onclick = (btn) => {
        let button = btn.target.dataset.btn;
        process(button)
    }
})
function process(button){
    if (!isNaN(button)) {
        digitPress(button);
    } else {
        operatorPress(button);
        console.log(button);
    } 
    float ? grid[0].innerHTML = parseFloat(problem[currentPosition]) + "." : grid[0].innerHTML = parseFloat(problem[currentPosition]).toFixed(floatPostition);
    float = false;
}
function operatorPress(button){
    if (button === "decimal"){
            if (problem[currentPosition].match(decimal)) return;
            problem[currentPosition] = problem[currentPosition] + ".";
            float = true;
            return;
    }
    if (button === "ac") clear();
    if ( currentPosition === 1 || currentPosition === 3 ) {currentPosition += 1;}
    problem.push(button);
}
function digitPress(button){
    console.log(problem.length);
    if(problem.length === 1 ){
        currentPosition = 0;
        console.log("first");
    } else if (problem.length === 3 ){
        currentPosition = 3;       
        console.log("third");
    } else if (problem.length === 5 ){
        currentPosition = 5;       
        console.log("fifth");
    }
    addDigit(button, currentPosition);
}
function addDigit(data, position){
    problem[position] = (problem[position] + data)
    if((problem[currentPosition].match(decimal))) floatPostition +=1;
}
function clear(){
    problem = [0];
    float = false;
    floatPostition = 0;
    currentPosition = 0;   
    grid[0].innerHTML = 0;
}
function add(){

}