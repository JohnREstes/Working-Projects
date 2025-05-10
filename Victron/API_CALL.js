// API_CALL.js

const URL_WEATHER = 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m,temperature_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max&current_weather=true&';
const URL_GEOAPIFY_SEARCH = "https://api.geoapify.com/v1/geocode/search?";
const URL_GEOAPIFY_REVERSE = "https://api.geoapify.com/v1/geocode/reverse?";

let jsonWeather;
let jsonLatLon;
let jsonCityStateCounty;

export async function pullWeather(latitude = 20.36, longitude = -87.59){
    const url = (
        URL_WEATHER + new URLSearchParams({ 
            latitude: latitude, 
            longitude: longitude,
            timezone: 'America/Jamaica'
        })
      );
    try {
        const response = await fetch(url);
        jsonWeather = await response.json();
      } catch (error) {
        if (error instanceof SyntaxError) {
          // Unexpected token < in JSON
          console.log('There was a SyntaxError', error);
        } else {
          console.log('There was an error', error);
        }
      }
      
      if (jsonWeather) {
        console.log('JSON returned!', jsonWeather);
        return jsonWeather;
      }
}

export async function pullLatLon(location){
    var requestOptions = {
        method: 'GET',
      };
    const url = (
      URL_GEOAPIFY_SEARCH + new URLSearchParams({ 
            apiKey: API_KEY,
            text: location
        })
      );
    try {
        const response = await fetch(url, requestOptions);
        jsonLatLon = await response.json();
      } catch (error) {
        if (error instanceof SyntaxError) {
          // Unexpected token < in JSON
          console.log('There was a SyntaxError', error);
        } else {
          console.log('There was an error', error);
        }
      }
      
      if (jsonLatLon) {
        console.log('JSON returned!', jsonLatLon);
        return jsonLatLon;
      }
}
export async function pullCityStateCountry(lat, lon){
  var requestOptions = {
      method: 'GET',
    };
  const url = ( 
          URL_GEOAPIFY_REVERSE + new URLSearchParams({ 
              apiKey: API_KEY,
              lat: lat,
              lon: lon
      })
    );
  try {
      const response = await fetch(url, requestOptions);
      jsonCityStateCounty = await response.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Unexpected token < in JSON
        console.log('There was a SyntaxError', error);
      } else {
        console.log('There was an error', error);
      }
    }
    
    if (jsonCityStateCounty) {
      console.log('JSON returned!', jsonCityStateCounty);
      return jsonCityStateCounty;
    }
}