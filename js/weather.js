const urlWeather = "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true";
const urlWeatherReplace = "https://api.open-meteo.com/v1/forecast?latitude=replace1&longitude=replace2&current_weather=true";
let finalWeatherUrl;
let cityUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=replace1&lon=replace2&zoom=18&addressdetails=1'
let finalCityUrl;

// La fonction createUrl changera la latitude et la longitude dans l'URL de l'api Open Meteo avec les valeurs obtenues grâce à la localisation de l'utilisateur. 
function createUrl (url, a, b){
    let firstStep = url.replace("replace1", a);
    let resultUrl = firstStep.replace("replace2", b);
    return resultUrl;
}

// La fonction fetchWeather permettra de réaliser la méthode fetch sur l'API Open-Meteo pour obtenir la météo au temps présent.
const fetchWeather = async (url) => {
    try {
        const response = await fetch(url);
        let data = await response.json()
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}


// getTemperature() cherche la température dans l'API et l'affiche dans l'index.
const getTemperature = (url) => {
    fetchWeather(url)
    .then((promise) => {
        let temperature = promise.current_weather.temperature;
        document.getElementById("temperature").innerHTML = temperature + " °C";
    })
}


//getWeatherCode() permet de récupérer le temps dans l'API et d'afficher l'icône correspondant dans l'index
const weatherCodeObject = {
    clear : 'img/weatherIcons/sun.gif',
    cloudy : 'img/weatherIcons/clouds.gif',
    rain :  'img/weatherIcons/rain.gif',
    snow : 'img/weatherIcons/snow.gif',
    fog : 'img/weatherIcons/foggy.gif',
    storm: 'img/weatherIcons/storm.gif',
    error: 'img/weatherIcons/satellite.gif'
}


const getWeatherCode = (url) => {
    fetchWeather(url)
    .then((promise) => {
        let weatherCode = promise.current_weather.weathercode;
        switch(weatherCode) {
            case  0 :
                document.getElementById("weatherCode").src = weatherCodeObject.clear;
            break;
            case 1: case 2: case 3:
                document.getElementById("weatherCode").src = weatherCodeObject.cloudy;
            break;
            case 45: case 48:
                document.getElementById("weatherCode").src = weatherCodeObject.fog;
            break;
            case 51: case 53: case 55: case 56: case 57: case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82:
                document.getElementById("weatherCode").src = weatherCodeObject.rain;
            break;
            case 71: case 73: case 75: case 77: case 85: case 86:
                document.getElementById("weatherCode").src = weatherCodeObject.snow;
            break;
            case 95: case 96: case 99:
                document.getElementById("weatherCode").src = weatherCodeObject.storm;
            break;
            default:
                document.getElementById("weatherCode").src = weatherCodeObject.error;
        }
    })
}


// getTemperature()
// getWeatherCode();


let latitude;
let longitude;
let x;


// La fonction getLocation() permettra de trouver la localisation de l'utilisateur en lattitude et longitude.
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x = "Geolocation is not supported by this browser.";
  }
}


// La fonction showPosition permet de rendre la localisation de l'utilisateur dans deux variable latitude et longitude. 
function showPosition(position) {
  latitude = cutCoordinates(position.coords.latitude);
  longitude = cutCoordinates(position.coords.longitude);
  console.log(latitude);
  console.log(longitude);
  finalWeatherUrl = createUrl(urlWeatherReplace, latitude, longitude);
  getTemperature(finalWeatherUrl);
  getWeatherCode(finalWeatherUrl);
  finalCityUrl = createUrl(cityUrl, latitude, longitude);
  getCity(finalCityUrl);
}


// La fonction cutCoordinates permettra de formater la latitude et la longitude sous un format ne permettant que de garder deux chiffres après la virgule et l'arrondissant. 
function cutCoordinates(number) {
    return number.toFixed(2);
}


// La fonction fetchCity permet de trouver la ville dans laquelle se trouve l'utilisateur à partir de ses coordonnées de localisation. 
const fetchCity = async (url) => {
    try {
        const response = await fetch(url);
        let data = await response.json()
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}

function getCity (url){
    fetchCity(url)
    .then((promise) => {
        let cityLocation = promise.address.city
        document.getElementById("city").innerHTML = cityLocation;
    })
}

getLocation();
