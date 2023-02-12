class User {
  constructor(picture, name, email, dob, location, cell, password){
    this.picture = picture,
    this.name = name,
    this.email = email,
    this.dob = dob,
    this.location = location,
    this.cell = cell,
    this.password = password;
  }
  addUser(){
    console.log(this.email);
    console.log(this.dob);
    console.log(this.location);
    console.log(this.cell);
    console.log(this.password);
    profile[0].style.backgroundImage = `url('${this.picture}')`;
    profile[1].textContent = "Name:";
    profile[2].textContent = `${this.name.title} ${this.name.first} ${this.name.last}`
  }
}

const changeButton = document.querySelector('.changeButton');
const profile = document.querySelectorAll('[data-profile]');
const icon = document.querySelectorAll('[data-icon]')
let currentUser;

icon.forEach(icon =>{
  icon.addEventListener("click", (e)=>{
    iconClick(e.target.dataset.icon);
  })
})

changeButton.addEventListener("click", ()=>{
  newUser();
 });

 function iconClick(target){
  switch (target) {
    case 'name':
      profile[1].textContent = "Name:";
      profile[2].textContent = `${currentUser.name.title} ${currentUser.name.first} ${currentUser.name.last}`
      break;
    case 'email':
      profile[1].textContent = "Email:";
      profile[2].textContent = `${currentUser.email}`
      break;
    case 'birthday':
      let dob = new Date(currentUser.dob);
      var mm = dob.getMonth() + 1;
      var dd = dob.getDate();
      var yy = dob.getFullYear();
      console.log(`${mm}/${dd}/${yy}`);
      profile[1].textContent = "Birthday:";
      profile[2].textContent = `${mm}/${dd}/${yy}`
      break;
    case 'address':
      profile[1].textContent = "Address:";
      profile[2].textContent = `${currentUser.location.city}, ${currentUser.location.country}`
      break;
    case 'phone':
      profile[1].textContent = "Cell Phone Number:";
      profile[2].textContent = `${currentUser.cell}`
      break;
    case 'password':
      profile[1].textContent = "Password";
      profile[2].textContent = `${currentUser.password}`
      break;
}
 }

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
  currentUser = new User(user.results[0].picture.large, user.results[0].name, user.results[0].email, user.results[0].dob.date, user.results[0].location, user.results[0].cell, user.results[0].login.password);
  console.log(currentUser);
  currentUser.addUser();
}
newUser().catch(error => {
  error.message; // 'An error has occurred: 404'
});