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

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#citysearch");
  let city = document.querySelector("#city");
  city.innerHTML = input.value;
  let cityPlace = input.value;
  let apiKey = `9f4d1fba994d4673c7cb4a10548bae9a`;
  let apiUrlcity = `https://api.openweathermap.org/data/2.5/weather?q=${cityPlace}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlcity).then(showTemperature);
}

function showTemperature(response) {
  let cityTemperature = Math.round(response.data.main.temp);
  let todayTemperature = document.querySelector("#temperature");
  todayTemperature.innerHTML = `${cityTemperature}°C`;
  let weatherDescription = document.querySelector("#weather-description");
  let weatherDesc = response.data.main.weather[0].description;
  console.log(weatherDesc);
}

//function fahrChange (response) {
//let fahrTemp = Math.round((response.data.main.temp)*(9/5) +32);
//let fahrTempUpdate = document.querySelector("#temperature");
//fahrTempUpdate.innerHTML = `${fahrTemp}°F`;}

let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", search);

let currentLocation = document.querySelector("#Location");
currentLocation.addEventListener("click", showLocalTemperature);

//let fahrenheitChange = document.querySelector("#fahr");
//fahrenheitChange.addEventListener("click", fahrChange);

//let celsiusChange = document.querySelector("#cels");
//celsiusChange.addEventListener("click", showTemperature);
//function celsChange() {
//let cityTemperature = Math.round(response.data.main.temp);
//let celsChange = document.querySelector("#temperature");
//  celsChange.innerHTML = `${cityTemperature}°C`;}

//let celsius = document.querySelector("#cels");
//celsius.addEventListener("click", celsChange);

function showLocalTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let localTemperature = document.querySelector("#temperature");
  let localCity = response.data.name;
  let localCityUpdate = document.querySelector("#city");
  localCityUpdate.innerHTML = localCity;
  localTemperature.innerHTML = `${temperature}°C`;
  console.log(localCity);
}

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
