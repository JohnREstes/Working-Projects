const grid = document.querySelectorAll('.grid');
var problem = [0];
var postition = 0;
var active = false;
var decimal = false;
var trailingZero = 0;
const digit = /^[0-9]+$/;

grid.forEach(item => {
    item.onclick = (btn) => {
        let button = btn.target.dataset.btn;
        process(button)
    }
})
function process(button) {
    /*if(button.match(digit) == null ) return*/

    if(button.match(digit)){
        console.log(button);
        console.log(decimal);
        if (active){
            clear()
            active = false;
        }
        if(decimal) {trailingZero += 1};
        problem[postition] += button;
        grid[0].innerHTML = parseFloat(problem[postition]).toFixed(trailingZero);
    } else {
        decimal = false;
        trailingZero = 0;
        active = false;
        problem.push(button)
        postition = problem.length;
        problem.push(0);
    }
    if (problem[(problem.length - 2)]==="ac") {
        console.log("ac");
        clear();
        grid[0].innerHTML = 0;
    }
    if (problem[(problem.length - 2)]==="plusMinus") {
        problem.pop();
        problem.pop();
        problem[(problem.length - 1)] = (parseFloat(problem[(problem.length - 1)]) * -1);
        grid[0].innerHTML = problem[(problem.length - 1)];
    }
    if (problem[(problem.length - 2)]==="percentage") {
        problem.pop();
        problem.pop();
        problem[(problem.length - 1)] = (parseFloat(problem[(problem.length - 1)]) * .01);
        grid[0].innerHTML = problem[(problem.length - 1)];
        console.log(problem);
    }
    if (problem[(problem.length - 2)]==="decimal") {
        problem.pop();
        problem.pop();
        postition -= 2;
        problem[postition] += '.';
        decimal = true;
        grid[0].innerHTML = parseFloat(problem[postition]) + ".";
    }
    if (problem[(problem.length - 2)]==="equal") {
        let sol = 0;
        switch (problem[1]){
            case "plus": 
                sol = add();
                break;
            case "minus":   
                sol = subtract();
                break;
            case "times":   
                sol = multiply();
                break;
            case "divides": 
                sol = divide();
                break;
            default: 
                grid[0].innerHTML = "ERROR";
        }
        grid[0].innerHTML = sol;
        clear();
        active = true;
        problem[0] = sol
        console.log(problem);
    }
    console.log(problem);
}

function add(){
    return parseFloat(problem[problem.length - 5]) + parseFloat(problem[problem.length - 3]);
}
function subtract(){
    return parseFloat(problem[problem.length - 5]) - parseFloat(problem[problem.length - 3]);
}
function multiply(){
    console.log(parseFloat(problem[problem.length - 5]) + " / " + parseFloat(problem[problem.length - 3]))
    return parseFloat(problem[problem.length - 5]) * parseFloat(problem[problem.length - 3]);
}
function divide(){
    let product = parseFloat(problem[problem.length - 5]) / parseFloat(problem[problem.length - 3]);
    console.log(parseFloat(problem[problem.length - 5]) + " / " + parseFloat(problem[problem.length - 3]));
    if (product === Infinity) product = "Not a Number";
    return product;
}
function clear(){
    problem = [0];
    postition = 0;
    decimal = false;
    active = false;
    trailingZero = 0;
}