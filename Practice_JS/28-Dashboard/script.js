

const weather = document.getElementById('weather');

weather.addEventListener('click', ()=>{
    weather.classList.remove('full'); // reset animation
    void weather.offsetWidth; // trigger reflow
    weather.classList.add('full'); // start animation
})

const quiz = document.getElementById('quiz');

quiz.addEventListener('click', ()=>{
    quiz.classList.remove('full'); // reset animation
    void quiz.offsetWidth; // trigger reflow
    quiz.classList.add('full'); // start animation
})