const REFRESH_RATE = 10; //seconds
const VICTRON_API = 'https://node.dondeestasyolanda.com/api/victron/data';
const GENERATOR_API = 'https://node.dondeestasyolanda.com/api/status';
const toggleSwitch = document.getElementById('toggleSwitch');
const generatorStatusField = document.getElementById('GeneratorStatus');
const settingsObject = {};
let generatorRunning, errorState, settings;
let requestToRun = false;


async function fetchData(){
  let victron_data = await get_Data(VICTRON_API)
  format_data(victron_data);
  time_Stamp();
  await get_status(GENERATOR_API);
}

async function get_Data(url) {
  const headers = { };
  var requestOptions = {
    method: 'GET',
    headers: headers,
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
          elm = document.getElementById("VRMvoltage")
          elm.innerText = record.formattedValue
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
    defaultVoltage: document.getElementById('defaultVoltage').value,
    defaultRuntime: document.getElementById('defaultRuntime').value,
    checkHour: document.getElementById('checkHour').value,
    checkVoltage: document.getElementById('checkVoltage').value,
    checkRuntime: document.getElementById('checkRuntime').value,
  };

  // Log the JSON object to the console (you can do whatever you want with it)
  console.log('Input Settings:', inputSettings);

  // You can also return the JSON object or use it as needed
  settingsObject = inputSettings;
}
