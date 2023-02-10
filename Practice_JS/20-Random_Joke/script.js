const changeButton = document.querySelector('.changeButton');
const randomJoke = document.querySelector('[data-joke]');

changeButton.addEventListener("click", ()=>{
  newJoke();
 });

function newJokes(){
  fetch('https://api.chucknorris.io/jokes/random', {
  method: 'GET'
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result.value);
     return result.value;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}

async function newJoke() {
  const response = await fetch('https://api.chucknorris.io/jokes/random', {
    method: 'GET'
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const joke = await response.json();
  randomJoke.textContent = joke.value;
}
newJoke().catch(error => {
  error.message; // 'An error has occurred: 404'
});