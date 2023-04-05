const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];

run.onclick = ()=>{

    let userList  = getUsers();
    console.log(userList);

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
async function getUsers(){
    let users = await fetch('https://randomuser.me/api/?results=5');
    if(users) return users
}