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
    night : 'img/weatherIcons/night.gif',
    cloudyNight : 'img/weatherIcons/cloudy_night.gif',
    clouds : 'img/weatherIcons/clouds.gif',
    cloudy : 'img/weatherIcons/cloudy.gif',
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
        if (weatherCode == 0 && (currentHour > 6 && currentHour < 19)){
            document.getElementById("weatherCode").src = weatherCodeObject.clear;
        } else if (weatherCode == 0 && (currentHour <= 6 || currentHour >= 19)){
            document.getElementById("weatherCode").src = weatherCodeObject.night;
        } else if (weatherCode == 1 && (currentHour > 6 && currentHour < 19)){
            document.getElementById("weatherCode").src = weatherCodeObject.cloudy;
        } else if (weatherCode == 2 || weatherCode == 3 && (currentHour > 6 && currentHour < 19)){
            document.getElementById("weatherCode").src = weatherCodeObject.clouds;
        } else if ((weatherCode == 1 || weatherCode == 2 || weatherCode == 3) && (currentHour <= 6 || currentHour >= 19)){
            document.getElementById("weatherCode").src = weatherCodeObject.cloudyNight;
        } else if (weatherCode == 45 || weatherCode == 48){
            document.getElementById("weatherCode").src = weatherCodeObject.fog;
        } else if (weatherCode == 51 || weatherCode == 53 || weatherCode == 55 || weatherCode == 56 || weatherCode == 57 || weatherCode == 61 || weatherCode == 63 || weatherCode == 65 || weatherCode == 66 || weatherCode == 67 || weatherCode == 80 || weatherCode == 81 || weatherCode == 82){
            document.getElementById("weatherCode").src = weatherCodeObject.rain;
        } else if (weatherCode == 71 || weatherCode == 73 || weatherCode == 75 || weatherCode == 77 || weatherCode == 85 || weatherCode == 86){
            document.getElementById("weatherCode").src = weatherCodeObject.snow;
        } else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99){
            document.getElementById("weatherCode").src = weatherCodeObject.storm;
        } else {
            document.getElementById("weatherCode").src = weatherCodeObject.error;
        }
    })
}



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
//   console.log(latitude);
//   console.log(longitude);
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
        // console.log(data);
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


// La fonction getUserTime() prendra la date de l'utilisateur afin de déterminer si nous sommes la nuit ou le jour. 
getUserTime();

function getUserTime(){
    newDate = new Date()
    newDate.getHours();
    currentDate = newDate.toString();
    currentHour = currentDate[16] + currentDate[17];
    return parseInt(currentHour);  
}

getLocation();



