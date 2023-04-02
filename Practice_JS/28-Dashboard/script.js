
const round = document.querySelectorAll('.round');

round.forEach(dial =>{
    dial.addEventListener('click', ()=>{
        if(dial.classList.contains('full')){
            dial.classList.remove('small', 'full'); // reset animation 
            void dial.offsetWidth; // trigger reflow            
            dial.classList.add('small') ;
        } else {
            dial.classList.remove('full', 'small'); // reset animation 
            void dial.offsetWidth; // trigger reflow
            dial.classList.add('full'); // start animation
        }
    })    
})