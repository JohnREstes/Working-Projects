const todoItems = document.querySelector('.todoItems');
const inputBox = document.querySelector('.inputBox');
const input = document.getElementById("myInput");
const clearAll = document.getElementById("clearAll");
class List_Item {
    constructor(id, item) {
        this.id = id,
        this.item = item;
    }
}
var activeEdit = false;
function checkLocSto(){
    let storage = mutateLocSto('','', "retrieve");
    if(storage.length > 0){
        storage.forEach(e => {
            build(e.id, e.item)
        });
    } else {
    window.localStorage.setItem('items', JSON.stringify([]));
    }

}

checkLocSto();

function mutateLocSto(id, item = '', operation){
    let grocList = JSON.parse(window.localStorage.getItem('items'));
    switch(operation){
        case "add":
            grocList.push(new List_Item(id, item));
            break;
        case "remove":
            grocList = grocList.filter(e => e.id !== id);
            break;
        case "edit":
            grocList = grocList.filter(e => e.id !== id);
            grocList.push(new List_Item(id, item));
            break;
        case "retrieve":
            return grocList;
        case "clear":
            window.localStorage.clear('items');
            grocList = [];
            location.reload()
            break;
        default:
            alert("something is wrong");
            break;
    }
    window.localStorage.setItem('items', JSON.stringify(grocList));
    console.log(JSON.parse(window.localStorage.getItem('items')));
}

inputBox.children[1].onclick = ()=>{
    addItem();
}
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && !activeEdit) {
    event.preventDefault();
    addItem();
  }
});
clearAll.onclick = ()=>{
    mutateLocSto('','', 'clear');
}
function addItem(){
    let inputText = inputBox.children[0].value;
    if (inputText === "") alert("Please enter a To Do List Item");
    else build('',inputText);
    inputBox.children[0].value = ""
}
function randomID(){
    return Date.now();
}
function buttonOp(e){
    let operation = e.dataset.name;
    let id = e.id
    id = parseInt(id.replace(/[a-z]/g, ''));
    var currentText = document.getElementById(`${id}text`).innerHTML;
    const approve = document.getElementById(`${id}approve`);
    switch (operation) {
        case "edit":
            activeEdit = true;
            inputBox.children[0].value = currentText;
            inputBox.children[1].classList.add('inactive');
            approve.classList.remove("inactive");
            approve.classList.add("inputActive", "green");
            break;
        case "delete":
            let currentItem = document.getElementById(`${id}item`);
            inputBox.children[0].value = '';
            currentItem.remove();
            mutateLocSto(id, '', "remove");
            break;
        case "approve":
            activeEdit = false;
            document.getElementById(`${id}text`).innerHTML = inputBox.children[0].value;
            mutateLocSto(id, inputBox.children[0].value, "edit");
            inputBox.children[1].classList.remove('inactive');
            approve.classList.remove("inputActive", "green");
            approve.classList.add("inactive");
            inputBox.children[0].value = '';
            break;
    }
}

function build(randID, text){
    if(randID == '') {
        randID = randomID()
        mutateLocSto(randID, text, "add");
    }
    let newItemDiv = document.createElement("div");
    newItemDiv.className = 'item';
    newItemDiv.id = `${randID}item`;
    var todoListString = `            
                <span class="indvidualItem">
                    <p class="itemText" id="${randID}text">${text}</p>
                    <input type="text" class="inputInactive inputItem" placeholder="">
                    <span class="right">
                        <span onclick=buttonOp(this) data-name="approve" class="material-symbols-rounded inactive" id="${randID}approve">offline_pin</span>
                        <span onclick=buttonOp(this) data-name="edit" class="material-symbols-rounded blue" id="${randID}edit">edit_note</span>
                        <span onclick=buttonOp(this) data-name="delete" class="material-symbols-rounded red" id="${randID}delete">cancel</span>
                    </span>
                </span>
            </div>
    `
    todoItems.appendChild(newItemDiv);
    todoItems.lastChild.innerHTML = todoListString
    return 
}
