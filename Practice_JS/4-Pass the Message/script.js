const messageSubmit = document.querySelector('.messageSubmit');
const messageText = document.querySelector('.messageText');
const messageField = document.querySelector('#messages');

messageSubmit.addEventListener("click", ()=>{
  retrieveText();
 });

function retrieveText(){
  let text = messageText.value;
  if (text == ""){
    addMessage("YOU CANNOT SUBMIT A BLANK ENTRY");
    blank();
  }else{
    addMessage(text);
    messageText.value = "";
  }
}
function addMessage(value) {
  const node = document.createElement("li");
  const textnode = document.createTextNode(value);
  node.appendChild(textnode);
  messageField.appendChild(node);
}

function blank(){
  setTimeout(() => {
    messageField.removeChild(messageField.lastChild);
  }, 2000);
}