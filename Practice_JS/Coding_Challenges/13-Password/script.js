const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];
let password1 = "133Utica"
let password2 = "Ou812wwww!"
let regSpecial = /[\.,-\/#!$%\^&\*;:{}=\-_`~()'@\+\?><\[\]\+]/g;
let regCapital = /[A-Z]/g;
let regLower = /[a-z]/g

run.onclick = ()=>{

    display.push(checkPassword(password1))
    display.push(checkPassword(password2))
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

function checkPassword(value){
    let valid = true;
    console.log(value.length);
    if(value.search(regSpecial) === -1 || value.search(regCapital) === -1 || value.search(regLower) === -1 || value.length < 8) valid = false;
    return outcome = valid ? "Your Password is Valid" : "Your Password is invalid";
}