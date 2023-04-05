const container = document.querySelector('.container');
const color = document.querySelectorAll('[data-color]');

color.forEach(button =>{
    button.addEventListener('click', ()=>{
        container.style.backgroundColor = button.dataset.color
    })
})