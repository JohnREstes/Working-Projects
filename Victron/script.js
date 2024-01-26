const REFRESH_RATE = 60;
const VICTRON_API = 'https://node.dondeestasyolanda.com/api/victron/data'
const GENERATOR_API = 'https://node.dondeestasyolanda.com/api/generator/status'

async function fetchData(){
  let victron_data = await get_Data(VICTRON_API)
  format_data(victron_data);
  time_Stamp();
  let post_data = await sendPostRequest(GENERATOR_API)
  console.log(post_data)
  let generator_data = await get_Data(GENERATOR_API)
  console.log(generator_data)
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

async function sendPostRequest(url) {

  // Sample data to be sent in the request body
  const postData = {
      voltage: 55.0,           // Replace with the actual voltage value
      start_status: true        // Replace with the actual start status
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
              // Add any other headers if needed
          },
          body: JSON.stringify(postData)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      // Handle the success response as needed
  } catch (error) {
      console.error('Error:', error);
      // Handle errors here
  }
}
