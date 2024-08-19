const REFRESH_RATE = 10; //seconds
const HOST = 'http://127.0.0.1:3000';
//const HOST = 'https://node.johnetravels.com/app1';
const VICTRON_API = `${HOST}/api/victron/data`;
const GROWATT_API = `${HOST}/api/growattData`;
const loadingGraphic = document.getElementById('loadingGraphic')
let victronAPItimestamp = 0;
var storedToken = null


async function fetchData(){
  if(storedToken){
    let victron_data = await get_Data(VICTRON_API)
    format_data(victron_data);
        loadingGraphic.classList.add('none');
    time_Stamp();
    let growattData = await get_Growatt_Data(GROWATT_API)
    await formatGrowattData(growattData)
    console.log(growattData)
  }
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

async function get_Growatt_Data(url) {
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
        case 49:
          elm = document.getElementById("VRMcurrent")
          elm.innerText = record.formattedValue
          break;
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
        case 243:
          elm = document.getElementById("VRMBatteryPower")
          elm.innerText = record.formattedValue        
          break;    
        case 146:
          elm = document.getElementById("TimeToGo")
          elm.innerText = record.formattedValue        
          break;  
        default:
          break;
      }
    }
    const chargingDischarge = document.getElementById('charging/discharging');
    const vrmCurrentText = document.getElementById("VRMcurrent").innerText;
    
    if (vrmCurrentText.includes('-')) {
      chargingDischarge.innerText = "Discharging";
    } else {
      chargingDischarge.innerText = "Charging";
    }
  }

async function formatGrowattData(data){
   
    const yolandaPower = document.getElementById('Yolandapower');
    const casa1Power = document.getElementById('Casa1power');
    const casa2Power = document.getElementById('Casa2power');

    yolandaPower.innerText = data.yolandaData.panelPower;
    casa1Power.innerText = data.casaMJData1.panelPower;
    casa2Power.innerText = data.casaMJData2.panelPower;
}

fetchData();

setInterval(fetchData, REFRESH_RATE * 1000)

function time_Stamp() {
  // Get the current date and time
  const currentDate = new Date();
  const victronAPItimestampConverted = new Date((victronAPItimestamp * 1000));

  // Convert the date and time to a string without seconds in the user's local time zone
  const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let el = document.getElementById('timeStamp');
  el.innerText = formattedTime;
}


const loginContainer = document.getElementById('loginContainer');
const settingsLocalP = document.getElementById('settingLocal');
var savedSettings = JSON.parse(localStorage.getItem('settings'));
var hostName = `${HOST}/`

// window.addEventListener('unhandledrejection', function (event) {
//   console.error('Unhandled Promise Rejection:', event.reason);
// });


async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${HOST}/login`, {
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
        const response = await fetch(`${HOST}/protected-route`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          loginContainer.style.display = 'none'
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