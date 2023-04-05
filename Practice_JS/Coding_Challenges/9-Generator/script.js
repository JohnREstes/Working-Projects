const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display;
let stations = ['Poughkeepsie', 'Newburgh', 'Peekskill', 'Yonkers', 'Bronx', 'Grand Central']
const gen = getStop(stations)
let done = false;

run.onclick = ()=>{

    let temp = gen.next()
    display = temp.value
    console.log(temp.done)
    if(temp.done){
        display = "We Made It!"
        run.setAttribute('disabled', true);
    }
    
    addOutput()
}
clear.onclick = ()=>{
    output.innerHTML = ""
    display = '';
}
function addOutput(){
        let temp = document.createElement('li');
        temp.innerText = display;
        output.appendChild(temp);
        display = ''
}

function* getStop(stations){
    yield stations[0];
    yield stations[1];
    yield stations[2];
    yield stations[3];
    yield stations[4];
    yield stations[5];
}