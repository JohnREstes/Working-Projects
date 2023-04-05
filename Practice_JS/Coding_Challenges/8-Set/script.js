const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];

run.onclick = ()=>{

    
    addOutput()
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