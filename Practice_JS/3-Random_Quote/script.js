const changeButton = document.querySelector('.changeButton');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

updateQuote();

changeButton.addEventListener("click", ()=>{
  updateQuote();
 });

async function updateQuote() {
  // Fetch a random quote from the Quotable API
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  if (response.ok) {
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
  } else {
    quote.innerHTML = "An error occured";
  }
}