const changeButton = document.querySelector(".changeButton");
const root = document.documentElement;
const backgroundColor = ["--rgb1", "--rgb2", "--rgb3"];

changeButton.addEventListener("click", () => {
  backgroundColor.forEach(randomColorRBG);
});

function randomColorRBG(rgb) {
  var colorValue = Math.floor(Math.random() * (255 + 1));
  root.style.setProperty(rgb, colorValue);
}

  console.log("HI")
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      //You are logged in
    } else {
      //you are not logged in
    }
  });
  
  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // log out error
      console.log(errorCode, errorMessage);
    });

