const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];

run.onclick = ()=>{

    setInterval(()=>{
        output.innerHTML = ""
        display = [];
        display.push(time());
        addOutput()
    }, 1000)
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
function time(){
    let now = new Date()
    let tick = now.toLocaleTimeString()
    return tick
}
function calcTime(){

}