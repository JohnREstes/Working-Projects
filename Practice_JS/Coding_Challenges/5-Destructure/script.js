const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];

const classes =
    {
        hasTeachAssit: false,
        classList: ['mary', 'john', 'mike', 'eli', 'butters', 'lora', 'ana']
    }  

function getStudents(classroom){
    let {hasTeachAss, classList} = classroom;
    let teacher, teachAssit, students
    if(hasTeachAss){
        [teacher, teachAssit, ...students] = classList;
    } else {
        [teacher, ...students] = classList;
    }
    return students
}

run.onclick = ()=>{

    display = getStudents(classes);
    addOutput();
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