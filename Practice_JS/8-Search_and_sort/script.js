const buttons = document.querySelectorAll('.btn');
const items = document.querySelectorAll('.item');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        btnClick(e.target.classList[1]);
    })
  })

function btnClick(target){
    items.forEach(item => {
        item.classList.remove("hidden");
    })
    if (target === "all") return;
    var finalList = [];
    items.forEach(item => {
        if(item.classList[1] !== target)finalList.push(item);
    });
    finalList.forEach(item => {
        item.classList.add("hidden");
    });
}
