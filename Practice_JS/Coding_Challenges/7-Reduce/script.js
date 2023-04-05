const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];
const numOfCoffees = [2,3,1,5];
const priceOfCoffee = 1.25;

run.onclick = ()=>{

    display = total();
    
    addOutput()
}
clear.onclick = ()=>{
    output.innerHTML = ""
    display = [];
}
function addOutput(){
    let temp = document.createElement('li');
    temp.innerText = display;
    output.appendChild(temp);
}

function total(){
    let sum = numOfCoffees.reduce((prevVal, curVal)=>(prevVal += curVal));
    return `The total of coffee is $${(sum * priceOfCoffee)}.`
}