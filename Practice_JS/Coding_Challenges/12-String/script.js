const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];
let blog1 = "My blog name!"
let blog2 = "Emma's blog"
let regPunc = /[\.,-\/#!$%\^&\*;:{}=\-_`~()'@\+\?><\[\]\+]/g;
let regSpace = /\s/g

run.onclick = ()=>{

    display.push(URLify(blog1));
    display.push(URLify(blog2));
    
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

function URLify(value){
    let clean = value.replace(regPunc, '');
    let lower = clean.toLowerCase().trim();
    let dash = lower.replace(regSpace, '-');
    return dash
}