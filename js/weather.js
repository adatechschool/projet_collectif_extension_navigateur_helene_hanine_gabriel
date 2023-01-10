// Fetch sur l'API Open-Meteo pour obtenir la météo au temps présent
const urlWeather = "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true";
document.getElementById("city").innerHTML = "Paris";


const fetchWeather = async () => {
    try {
        const response = await fetch(urlWeather);
        let data = await response.json()
        return data;
    }
    catch (error) {
        console.log(error.message);
    }
}

// getTemperature() cherche la temperature dans l'API et l'affiche dans l'index
const getTemperature = () => {
    fetchWeather()
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

const getWeatherCode = () => {
    fetchWeather()
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

getTemperature()
getWeatherCode();
