const loginContainer = document.getElementById('loginContainer');
const settingsLocalP = document.getElementById('settingLocal');
var storedToken = null
var savedSettings = JSON.parse(localStorage.getItem('settings'));

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        await handleToken();
      } else {
        alert('Invalid credentials. Please try again.');
      }
      
  }

  async function handleToken() {
    // Retrieve token from localStorage
    storedToken = localStorage.getItem('token');
    // Check if the token is present
    if (storedToken) {
      try {
        // Make a request with the token in the headers
        const response = await fetch('http://localhost:3000/protected-route', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          loginContainer.style.display = 'none'
          getSettings()
        } else {
          console.error('Error:', response.statusText);
          loginContainer.style.display = 'flex'
        }
      } catch (error) {
        console.error('Error:', error.message);
        loginContainer.style.display = 'flex'
      }
    } else {
      console.log('Token not found in localStorage');
      loginContainer.style.display = 'flex'
    }
  }

  var jsonString = {};

  async function saveSettings() {
    console.log(jsonString2)
    try {
      const response = await fetch('http://localhost:3000/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
        body: JSON.stringify(jsonString2),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Settings successfully uploaded:', data.settings);
        await saveSettingsLocal(data.settings)
        updateSettingsP()
      } else {
        const errorData = await response.json();
        console.error('Error in uploading settings:', errorData.error || 'Unknown error');
        alert('Error in uploading settings');
      }
    } catch (error) {
      console.error('Unexpected error during saveSettings:', error);
      alert('Unexpected error occurred');
    }
  }
  
  async function getSettings() {
    try {
      const response = await fetch('http://localhost:3000/getSettings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await saveSettingsLocal(data)
        updateSettingsP()
      } else {
        console.error('Error retrieving settings:', response.statusText);
        alert('Error retrieving settings');
      }
    } catch (error) {
      console.error('Unexpected error during getSettings:', error);
      alert('Unexpected error occurred');
    }
  }


  const jsonString2 = {"id":1,"username":"Eli","password":"LennyIsCute"};


handleToken()

document.getElementById('saveSettingsButton').addEventListener('click', async function(event) {
  event.preventDefault();
  await saveSettings();
});

document.getElementById('getSettingsButton').addEventListener('click', async function(event) {
  event.preventDefault();
  await getSettings();
});
async function saveSettingsLocal(data){
  localStorage.setItem('settings', JSON.stringify(data));
  savedSettings = JSON.parse(localStorage.getItem('settings'))
}
function updateSettingsP() {
  console.log(savedSettings);

  if (savedSettings && savedSettings.username) {
    settingsLocalP.innerText = savedSettings.username;
  } else {
    console.error('Invalid or missing username in savedSettings');
    // Handle the error or update the UI accordingly
  }
}

