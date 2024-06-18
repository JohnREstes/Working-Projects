const REFRESH_RATE = 10; //seconds
const VICTRON_API = 'https://node.dondeestasyolanda.com/api/victron/data';
const GENERATOR_API = 'https://node.dondeestasyolanda.com/api/status';
const toggleSwitch = document.getElementById('toggleSwitch');
const generatorStatusField = document.getElementById('GeneratorStatus');
const defaultVoltage = document.getElementById('defaultVoltage');
const defaultRuntime = document.getElementById('defaultRuntime');
const checkHour = document.getElementById('checkHour');
const checkVoltage = document.getElementById('checkVoltage');
const checkRuntime = document.getElementById('checkRuntime');
let settingsObject = {};
let generatorRunning, errorState, settings;
let requestToRun = false;
let victronAPItimestamp = 0;


async function fetchData(){
  let victron_data = await get_Data(VICTRON_API)
  format_data(victron_data);
  time_Stamp();
  await get_status(GENERATOR_API);
}

async function get_Data(url) {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${storedToken}`,
    },
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    let data = JSON.parse(result); // result is a JSON string
    return data
  } catch (error) {
    console.log('error', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

async function format_data(data) {
  let elm;
    for (const record of data) {
      switch (record.idDataAttribute) {
        case 81:
          elm = document.getElementById("VRMvoltage");
          elm.innerText = record.formattedValue;
          victronAPItimestamp = record.timestamp;
          break;
        // case 49:
        //   elm = document.getElementById("VRMcurrent")
        //   elm.innerText = record.formattedValue
        //   break;
        case 51:
          elm = document.getElementById("VRMstate")
          elm.innerText = record.formattedValue        
          break;
        case 94:
          elm = document.getElementById("VRMtoday")
          elm.innerText = record.formattedValue        
          break;
        case 96:
          elm = document.getElementById("VRMyesterday")
          elm.innerText = record.formattedValue        
          break;
        case 442:
          elm = document.getElementById("VRMpower")
          elm.innerText = record.formattedValue        
          break;
    
        default:
          break;
      }
    }
  }

fetchData();

setInterval(fetchData, REFRESH_RATE * 1000)

function time_Stamp() {
  // Get the current date and time
  const currentDate = new Date();
  const victronAPItimestampConverted = new Date((victronAPItimestamp * 1000));
  console.log(victronAPItimestampConverted)

  // Convert the date and time to a string without seconds in the user's local time zone
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  console.log(formattedTime);

  let el = document.getElementById('timeStamp');
  el.innerText = formattedTime;
}

let iniLoad = true

async function get_status(url) {
  try {
    var statusData = {};
    if(iniLoad == true){
        statusData = {
          "generatorRunning": "",
          "requestToRun": "",
          "errorState": "",
          "settings": null
        };
    } else {
      statusData = {
        "generatorRunning": "",
        "requestToRun": requestToRun,
        "errorState": "",
        "settings": settingsObject
    };
    }


    const params = new URLSearchParams({
        "message": JSON.stringify(statusData)
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();


    generatorRunning = data.generatorRunning;
    requestToRun = data.requestToRun;
    errorState = data.errorState;
    settings = data.settings;

    await configureSettings(settings)
    
    if(iniLoad == true && requestToRun == true && generatorRunning == true){
      requestToRun = data.requestToRun
      toggleSwitch.checked = true
      generatorStatusField.innerText = 'ON'
    }
    iniLoad = false

    console.log("Server response:");
    console.log("Generator Running:", generatorRunning);
    console.log("Error State:", errorState);
    if(generatorRunning == true){
      generatorStatusField.innerText = 'ON'
    } else {
      generatorStatusField.innerText = 'OFF'
    } 
    if(errorState == true){
      requestToRun = false
      toggleSwitch.checked = false
      generatorStatusField.innerText = 'ERROR'
    }

} catch (error) {
    console.error("Error sending GET request:", error);
}
}

toggleSwitch.addEventListener('change', ()=>{
  if (toggleSwitch.checked) {
      console.log('Toggle switch is ON');
      requestToRun = true
  } else {
      console.log('Toggle switch is OFF');
      requestToRun = false
  }
})


//  HTML Modification

const settingsMenu = document.getElementsByClassName('settingsMenu')[0]; // Get the first element in the collection
const settingsGear = document.getElementById('settingsGear');
const settingsClose = document.getElementById('settingsClose');
const inputElements = document.querySelectorAll('.settingsGrid input');
const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', onSaveButtonClick);

settingsGear.addEventListener('click', () => {
  settingsMenu.style.display = 'inline-block';
});

settingsClose.addEventListener('click', () => {
  settingsMenu.style.display = 'none';
});

async function configureSettings(serverSettings){
  // ensures module is not displayed, so that items can be changed
  if (window.getComputedStyle(settingsMenu).display == 'none') {
    for (const inputId in serverSettings) {
      if (serverSettings.hasOwnProperty(inputId)) {
          const inputElement = document.getElementById(inputId);
          const settings = serverSettings[inputId];
          inputElement.value = settings
      }
  }}
}
// Function to handle button click
function onSaveButtonClick() {
  // Create a JSON object to store input settings
  var inputSettings = {
    defaultVoltage: defaultVoltage.value,
    defaultRuntime: defaultRuntime.value,
    checkHour: checkHour.value,
    checkVoltage: checkVoltage.value,
    checkRuntime: checkRuntime.value,
  };

  console.log('Input Settings:', inputSettings);
  settingsObject = inputSettings;
  saveSettings(inputSettings)
}

const loginContainer = document.getElementById('loginContainer');
const settingsLocalP = document.getElementById('settingLocal');
var storedToken = null
var savedSettings = JSON.parse(localStorage.getItem('settings'));
var hostName = "https://node.dondeestasyolanda.com"

window.addEventListener('unhandledrejection', function (event) {
  console.error('Unhandled Promise Rejection:', event.reason);
});


async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://node.dondeestasyolanda.com/login', {
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
        const response = await fetch('https://node.dondeestasyolanda.com/protected-route', {
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

  handleToken()

  var jsonString = {};

  async function saveSettings(data) {
    console.log(data);
    try {
      const response = await fetch('https://node.dondeestasyolanda.com/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Settings successfully uploaded:', data.settings);
          defaultVoltage.style.color = "green";
          defaultRuntime.style.color = "green";
          checkHour.style.color = "green";
          checkVoltage.style.color = "green";
          checkRuntime.style.color = "green";
          setTimeout(() => {
            defaultVoltage.style.color = "black";
            defaultRuntime.style.color = "black";
            checkHour.style.color = "black";
            checkVoltage.style.color = "black";
            checkRuntime.style.color = "black";
          }, "5000");
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
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
      const response = await fetch('https://node.dondeestasyolanda.com/getSettings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
          defaultVoltage.value = data.defaultVoltage;
          defaultRuntime.value = data.defaultRuntime;
          checkHour.value = data.checkHour
          checkVoltage.value = data.checkVoltage
          checkRuntime.value = data.checkRuntime;
      } else {
        console.error('Error retrieving settings:', response.statusText);
        alert('Error retrieving settings');
      }
    } catch (error) {
      console.error('Unexpected error during getSettings:', error);
      alert('Unexpected error occurred');
    }
  }


  //const jsonString2 = {defaultVoltage: '49', defaultRuntime: '30', checkHour: '2100', checkVoltage: '52', checkRuntime: '35'};



async function saveSettingsLocal(data){
  localStorage.setItem('settings', JSON.stringify(data));
  savedSettings = JSON.parse(localStorage.getItem('settings'))
}
async function updateSettingsP() {
  console.log(savedSettings);

  if (savedSettings) {
 
    settingsLocalP.innerText = savedSettings;
  } else {
    console.error('Invalid or missing username in savedSettings');
    // Handle the error or update the UI accordingly
  }
}

