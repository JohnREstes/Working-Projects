const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');

function addOutput(data){
    let temp = document.createElement('li');
    temp.innerText = data;
    output.appendChild(temp);
}

run.onclick = ()=>{
    addOutput(divide(4,2));
    addOutput(multiply(4,2))
}
clear.onclick = ()=>{
    output.innerHTML = ""
}

function divide(x, y){
    return x / y;
}
function multiply(x, y){
    return x * y;
}