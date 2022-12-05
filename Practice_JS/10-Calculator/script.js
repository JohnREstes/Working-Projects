const grid = document.querySelectorAll('.grid');
var problem = [0];
var postition = 0;
var number = true;
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
        problem[postition] += button;
        grid[0].innerHTML = parseInt(problem[postition]);
    } else {
        problem.push(button)
        postition = problem.length;
        problem.push(0);
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
        problem.push(sol)
        console.log(problem);
    }
    if (problem[(problem.length - 2)]==="ac") {
        console.log("ac");
        problem = [0];
        postition = 0;
        grid[0].innerHTML = 0;
        console.log(problem);
    }
}

function add(){
    return parseInt(problem[problem.length - 5]) + parseInt(problem[problem.length - 3]);
}
function subtract(){
    return parseInt(problem[problem.length - 5]) - parseInt(problem[problem.length - 3]);
}
function multiply(){
    return parseInt(problem[problem.length - 5]) * parseInt(problem[problem.length - 3]);
}
function divide(){
    return parseInt(problem[problem.length - 5]) / parseInt(problem[problem.length - 3]);
}
