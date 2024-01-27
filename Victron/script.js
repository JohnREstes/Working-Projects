const REFRESH_RATE = 60;
const VICTRON_API = 'https://node.dondeestasyolanda.com/api/victron/data'
const GENERATOR_API = 'https://node.dondeestasyolanda.com/api/generator/status'
let generatorRunning
let requestToRun = true

async function fetchData(){
  let victron_data = await get_Data(VICTRON_API)
  format_data(victron_data);
  time_Stamp();
  await get_Generator(GENERATOR_API);
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

async function get_Generator(url) {
  try {
    const statusData = {
        "generatorRunning": "",
        "requestToRun": requestToRun
    };

    const params = new URLSearchParams({
        "message": JSON.stringify(statusData)
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    // Extract the 'requestToRun' from the server response

    console.log(data)
    generatorRunning = data.generatorRunning;

    console.log("Server response:");
    console.log("Generator Running:", generatorRunning);

} catch (error) {
    console.error("Error sending GET request:", error);
}
}
