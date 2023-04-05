const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];
let allMenus =  [['pizza', 'pasta'], ['pizza', 'calzones'], ['lobster'], ['calzones']]

function uniqueItems(){
    let combinedMenu = allMenus.flat();
    let setMenu = new Set();
    combinedMenu.forEach(item =>{
        setMenu.add(item);
    })
    return setMenu
}

run.onclick = ()=>{

    display = uniqueItems()
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