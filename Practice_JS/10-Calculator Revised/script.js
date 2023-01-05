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
    if(button.match(digit)){
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
    switch (button){
        case "ac":
            console.log("ac");
            clear();
            grid[0].innerHTML = 0;
            break;
        case "plusMinus":
            problem[(problem.length - 1)] = (parseFloat(problem[(problem.length - 1)]) * -1);
            grid[0].innerHTML = problem[(problem.length - 1)];
            break;
        case "percentage":
            problem[(problem.length - 1)] = (parseFloat(problem[(problem.length - 1)]) * .01);
            grid[0].innerHTML = problem[(problem.length - 1)];
            break;
        case "decimal":
            problem[postition] += '.';
            decimal = true;
            grid[0].innerHTML = parseFloat(problem[postition]) + ".";
            break;
        case "equal":
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
            break;
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
function addMath(){
    problem.push(button)
    postition = problem.length;
}