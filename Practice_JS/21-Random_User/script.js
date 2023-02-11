class User {
  constructor(name, email, dob, location, cell, password){
    this.name = name,
    this.email = email,
    this.dob = dob,
    this.location = location,
    this.cell = cell,
    this.password = password;
  }
}

const changeButton = document.querySelector('.changeButton');
const profile = document.querySelectorAll('[data-profile]');
const icon = document.querySelectorAll('[data-icon]')
let currentUser;

profile[0].style.backgroundImage = "url('John_Headshot.jpg')";

changeButton.addEventListener("click", ()=>{
  newUser();
 });

async function newUser() {
  const response = await fetch('https://randomuser.me/api/', {
    method: 'GET'
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const user = await response.json();
  console.log(user.results[0]);
  currentUser = new User(user.results[0].name, user.results[0].email, user.results[0].dob, user.results[0].location, user.results[0].cell, user.results[0].login.password);
  console.log(currentUser);
}
newUser().catch(error => {
  error.message; // 'An error has occurred: 404'
});