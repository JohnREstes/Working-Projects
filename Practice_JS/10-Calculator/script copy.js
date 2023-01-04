const grid = document.querySelectorAll('.grid');
var countDigit = 0, countOperator = ""; 
var digit1 = null, digit2 = null, digit3 = null, operator1 = null, operator2 = null;
var problem = [];
const decimal = /[0-9]+\./;
var float = false;
var floatPostition;
var currentPosition = 0;
var solved = false;

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
    float ? 
        grid[0].innerHTML = parseFloat(problem[currentPosition]) + "." : 
        (problem.length === 0) ? 
            grid[0].innerHTML = 0:
            grid[0].innerHTML = parseFloat(problem[currentPosition]).toFixed(floatPostition);
    float = false;
    console.log(problem);
}
function operatorPress(button){
    if(problem.length === 0) return;
    if(solved === true) {
        currentPosition = 0;
        solved = false;
    }
    if (button === "decimal"){
            if (problem[currentPosition].match(decimal)) return;
            problem[currentPosition] = problem[currentPosition] + ".";
            float = true;
            return;
    }
    if (button === "plusMinus"){
        currentDigit = parseFloat(problem[currentPosition])
        problem[currentPosition] = (currentDigit * -1);
        return;
    }
    if (button === "ac") {
        clear();
        return;
    }   
    if(isNaN(problem[(problem.length - 1)])) {
        problem.pop();
    }
    problem.push(button);
    orderOfOperations();
}
function digitPress(button){
    if(solved === true) {
        problem[0] = 0;
        solved = false;
    }
    if(problem.length === 0 ) nextDigit(0)
    else if (problem.length === 2 ) nextDigit(2)
    else if (problem.length === 4 ) nextDigit(4)
    addDigit(button, currentPosition);
    orderOfOperations();
    
}
function nextDigit(position){
    problem.push(0);
    currentPosition = position;  
    floatPostition = 0;  
}
function addDigit(data, position){
    problem[position] = (problem[position] + data)
    if((problem[currentPosition].match(decimal))) floatPostition +=1;
}
function clear(){
    problem = [];
    float = false;
    floatPostition = 0;
    currentPosition = 0;   
    grid[0].innerHTML = 0;
}
function orderOfOperations(){
    let operation, answer;
    if(problem[1] === "equal"){  
        problem.pop();
        return;
    }
    if(problem[3] === "equal"){     
        operation = problem[1];
        answer = solve(operation);
    clear()
    solved = true;
    problem[0] = answer; 
    if(answer.toString().match(/\./)) floatPostition = answer.toString().split('.')[1].length;
    }
    if(problem[3] === "times" || problem[3] === "divides"){
    if (!isNaN(problem[4])){
        console.log(currentPosition);
        let currentSolution = solve(problem[3]);
        problem = problem.slice(0,2);
        console.log(problem);
        problem.push(currentSolution);
        currentPosition = 2;
    }}

}
function solve(operation){
    let answer;
    switch(operation){
        case "plus":
            answer = parseFloat(problem[currentPosition - 2]) + parseFloat(problem[currentPosition]);
            break;
        case "minus":
            answer = parseFloat(problem[currentPosition - 2]) - parseFloat(problem[currentPosition]);
            break;
        case "times":
            answer = parseFloat(problem[currentPosition - 2]) * parseFloat(problem[currentPosition]);
            break;
        case "divides":
            answer = parseFloat(problem[currentPosition - 2]) / parseFloat(problem[currentPosition]);
            break;
    }
    return answer;
}