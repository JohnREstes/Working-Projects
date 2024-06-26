const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');

run.onclick = ()=>{

    getUsers();
}
clear.onclick = ()=>{
    output.innerHTML = ""
}

async function getUsers(){
    try {
        let response = await fetch('https://randomuser.me/api/?results=5');
        let data = await response.json();
        for(item of data.results){
            let temp = document.createElement('li');
            let image = document.createElement('img')
            image.src = item.picture.medium;
            temp.appendChild(image);
            output.appendChild(temp);
        }        
    } catch (error){
        console.log(error);
    }

}