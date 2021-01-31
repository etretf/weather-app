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

function formatHours(timestamp) {
    let now = new Date(timestamp);
    let hour = now.getHours();
    if (hour < 10) {hour=`0${hour}`;
    }
    
    let minutes = now.getMinutes();
    if (minutes < 10) {
     minutes = `0${minutes}`;
    }

    return `${hour}:${minutes}`;
    
}

function search(city) {
  
  let apiKey = `9f4d1fba994d4673c7cb4a10548bae9a`;
  let apiUrlcity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlcity).then(showTemperature);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
    event.preventDefault();
  let input = document.querySelector("#citysearch");
  let cityInputElement = document.querySelector("#city");
  city.innerHTML = input.value;
  let cityPlace = input.value;
  if (cityPlace<1) {alert("Please enter a city");}
  search(cityPlace);
}

function showForecast(response) {
    let forecastElement= document.querySelector("#forecast");
    forecastElement.innerHTML= null;
    let forecast = null;

    for (let index = 0;index<3; index++){
        forecast = response.data.list[index];
        forecastElement.innerHTML +=`
                            <div class="card">
                                <div class="card-body">
                                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" id="fcIcon"/>
                                    <div id="fcTime">${formatHours(forecast.dt*1000)}</div>
                                    <div id="fc"><strong id="fcTemp">${Math.round(forecast.main.temp)}</strong>°</div>
                            
                                </div>
                            </div>
                        `}
    }


function showTemperature(response) {
    let cityElement = document.querySelector("#city");
    let temperature = document.querySelector("#temp");
    let windSpeed = document.querySelector("#windSpeed");
    let humidity = document.querySelector("#humidity");
    let weatherDescription =document.querySelector("#weather-description");
    let iconElement = document.querySelector("#icon");
    let windDirectionElement = document.querySelector("#windDirection");
    let pressureElement = document.querySelector("#pressure");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML=response.data.name;
    temperature.innerHTML= Math.round(response.data.main.temp);
    windSpeed.innerHTML= Math.round(response.data.wind.speed);
    humidity.innerHTML= Math.round(response.data.main.humidity);
    weatherDescription.innerHTML= response.data.weather[0].description;
    windDirectionElement.innerHTML= response.data.wind.deg;
    pressureElement.innerHTML=response.data.main.pressure;
   
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
    ); 
  iconElement.setAttribute("alt", response.data.weather[0].description);
    }

function displayCelsius(event) {
    event.preventDefault();
    celsiusChange.classList.add("active");
    fahrenheitChange.classList.remove("active");
    let unitElement= document.querySelector("#degree-unit");
    let temperatureElement= document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    unitElement.innerHTML='°C';
}

function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureElement=document.querySelector("#temp")
    let unitElement=document.querySelector("#degree-unit");
    celsiusChange.classList.remove("active");
    fahrenheitChange.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
    unitElement.innerHTML='°F';
}

let celsiusChange= document.querySelector("#celsiusButton");
celsiusChange.addEventListener("click",displayCelsius);

let fahrenheitChange = document.querySelector("#fahrenheitButton");
fahrenheitChange.addEventListener("click",displayFahrenheit);

let celsiusTemperature= null;

let citySearch = document.querySelector("#citySearch");
citySearch.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", currentLocationButton);

function showLocalTemperature(response) {
  let localCity = document.querySelector("#city")
  let temperature = document.querySelector("#temp");
    let windSpeed = document.querySelector("#windSpeed");
    let humidity = document.querySelector("#humidity");
    let weatherDescription =document.querySelector("#weather-description");
    let iconElement = document.querySelector("#icon");
    let windDirectionElement = document.querySelector("#windDirection");
    let pressureElement = document.querySelector("#pressure");

    celsiusTemperature= response.data.main.temp;

    localCity.innerHTML= response.data.name;
    temperature.innerHTML= Math.round(response.data.main.temp);
    windSpeed.innerHTML= Math.round(response.data.wind.speed);
    humidity.innerHTML= Math.round(response.data.main.humidity);
    weatherDescription.innerHTML= response.data.weather[0].description;
    windDirectionElement.innerHTML= response.data.wind.deg;
    pressureElement.innerHTML=response.data.main.pressure;
   
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showLocalForecast(response) {
    let forecastElement= document.querySelector("#forecast");
    forecastElement.innerHTML= null;
    let forecast = null;

    for (let index = 0;index<3; index++){
        forecast = response.data.list[index];
        forecastElement.innerHTML +=`
                            <div class="card">
                                <div class="card-body">
                                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" id="fcIcon"/>
                                    <div id="fcTime">${formatHours(forecast.dt*1000)}</div>
                                    <div id="fc"><strong id="fcTemp">${Math.round(forecast.main.temp)}</strong>°</div>
                            
                                </div>
                            </div>
                        `}
}

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `9f4d1fba994d4673c7cb4a10548bae9a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalForecast);
}

function currentLocationButton(){
navigator.geolocation.getCurrentPosition(handlePosition);
}

search("Jeonju");