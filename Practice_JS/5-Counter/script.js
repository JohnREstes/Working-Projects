const increase = document.querySelector('.increase');
const decrease = document.querySelector('.decrease');
const counter = document.querySelector('.counter');

increase.addEventListener('click', ()=>{
  counter.textContent = Number(counter.textContent) + 1;
  positiveNegative();
});

decrease.addEventListener('click', ()=>{
  counter.textContent = Number(counter.textContent) - 1;
  positiveNegative();
});

function positiveNegative(){
  if (Number(counter.textContent) < 0){
    counter.classList.add('fontRed')
  }else if (Number(counter.textContent) > 0){
    counter.classList.add('fontGreen')
  }else{
    counter.classList.remove('fontRed');
    counter.classList.remove('fontGreen');
  }
}