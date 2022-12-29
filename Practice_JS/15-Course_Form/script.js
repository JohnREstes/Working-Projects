const buttons = document.querySelectorAll('.btn');
const items = document.querySelectorAll('.item');
const searchBar = document.querySelector('.searchBar');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        btnClick(e.target.classList[1]);
    })
  })

function btnClick(target){
    searchBar.value = "";
    if (target === "all") processSort('');
    else processSort(target);
}

searchBar.onkeyup = () => {
    let search = searchBar.value.toLowerCase();
    processSort(search);
}
function processSort(value){
    for (let i of items) {
        let item = i.classList[1].toLowerCase();
        if (item.indexOf(value) == -1) { i.classList.add("hidden"); }
        else { i.classList.remove("hidden"); }
    }
}