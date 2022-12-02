const buttons = document.querySelectorAll('.btn');
const items = document.querySelectorAll('.item');
const classes = ['all', 'cakes', 'cupcakes', 'sweets', 'doughnuts']

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log(e.target.classList[1]);
        btnClick(e.target.classList[1]);
    })
  })

function btnClick(target){
    console.log(e.target.classList);
}
