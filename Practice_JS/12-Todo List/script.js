const todoItems = document.querySelector('.todoItems');
const inputBox = document.querySelector('.inputBox');
console.log(todoItems.children);

inputBox.children[1].onclick = ()=>{
    let inputText = inputBox.children[0].value;
    if (inputText === "") alert("Please enter a To Do List Item");
    else build(inputText);
}

function randomID(){
    return Date.now();
}
function buttonOp(e){
    let operation = e.dataset.name;
    let id = e.id;
    switch (operation) {
        case "edit":
            break;
        case "delete":
            break;
        case "approve":
            break;
    }

    console.log(e.dataset.name + "   " + id);
}
function newItems(){
    build();
}
function build(text){
    let randID = randomID();
    let newItemDiv = document.createElement("div");
    newItemDiv.className = `item ${randID}`;
    var todoListString = `            
    <p class="indvidualItem">${text}
        <span class="right">
            <span onclick=buttonOp(this) data-name="approve" class="material-symbols-rounded inactive" id="${randID}">offline_pin</span>
            <span onclick=buttonOp(this) data-name="edit" class="material-symbols-rounded blue" id="${randID}">edit_note</span>
            <span onclick=buttonOp(this) data-name="delete" class="material-symbols-rounded red" id="${randID}">cancel</span>
        </span>
    </p>
    `
    todoItems.appendChild(newItemDiv);
    todoItems.lastChild.innerHTML = todoListString
    return 
}