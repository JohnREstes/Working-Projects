const buttons = document.querySelectorAll('.btn');
const items = document.querySelectorAll('.item');
const searchBar = document.querySelector('.searchBar');
const modal = document.querySelector("#myModal");
const closeX = document.querySelector(".close");
const itemBkgrd = document.querySelectorAll(".itemBkgrd");
const modalImg = document.querySelector('.modalImg');
const arrows = document.querySelectorAll('.arrow');
let next, previous;

buttons.forEach(button => {
    button.onclick = (e) => {
        btnClick(e.target.classList[1]);
    }
})
items.forEach(item => {
    item.onclick = (e) => {
        modal.style.display = "block";
        modalImg.style.backgroundImage = e.target.style.backgroundImage;
        console.log(e.target.closest(".item").nextElementSibling.children[0].style.backgroundImage);
        console.log(e.target.closest(".item").previousElementSibling.children[0].style.backgroundImage);
        next = e.target.closest(".item").nextElementSibling.children[0].style.backgroundImage;
        previous = e.target.closest(".item").previousElementSibling.children[0].style.backgroundImage;

    }
})
arrows.forEach(arrow => {
    arrow.onclick = (e) => {
        console.log(next);
        modalImg.style.backgroundImage = next;
    }
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
closeX.onclick = () => {
    modal.style.display = "none";
}
window.onclick = (e) => {
    if (e.target == modal) {modal.style.display = "none";}
}