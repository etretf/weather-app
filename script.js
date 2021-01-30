let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let displayTime = document.querySelector("#realTime");
displayTime.innerHTML = `${day} ${hour}:${minutes}`;


function displayTemperature (response) {
    let temperatureElement= document.querySelector("#temperature");
    let windElement = document.querySelector("#wind-speed");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#humidity");
    let iconElement = document.querySelector("#icon")

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML= Math.round(celsiusTemperature);
    cityElement.innerHTML=response.data.name;
    humidityElement.innerHTML=response.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute(
        "alt", response.data.weather[0].description
    );
}

function search(city) {
    let apiKey = "9f4d1fba994d4673c7cb4a10548bae9a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#citysearch");
    search(cityInputElement.value);
}


function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

}


function displayCelsiusTemperature(event) {
    event.preventDefault();

}


let celsiusTemperature = null; 


let search = document.querySelector("#citySearch");
search.addEventListener("submit", handleSubmit);


let fahrenheitConvert = document.querySelector("#fahr");
fahrenheitConvert.addEventListener("click", displayFahrenheitTemperature);


let celsiusConvert = document.querySelector("#cels");
celsiusConvert.addEventListener("click", displayCelsiusTemperature);



function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `9f4d1fba994d4673c7cb4a10548bae9a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalTemperature);
}
navigator.geolocation.getCurrentPosition(handlePosition);
