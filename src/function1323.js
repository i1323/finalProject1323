// Display the current day of the week and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Display the city name, current temperature, weather description, show the respective weather icon for today
function displayTemperature(response) {
  let cityElement = document.querySelector("#currentCity");
  let dateElement = document.querySelector("#todayIsThisDay");
  let iconElement = document.querySelector("#todays-weather-icon");
  let descriptionElement = document.querySelector("#todays-description");
  let temperatureElement = document.querySelector("#todays-temperature");
  let minElement = document.querySelector("#mini");
  let maxElement = document.querySelector("#max");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#whole-forecast");
  forecastElement.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" id="first-time-slot">12:00</h5>
          <p class="card-text"><strong>16</strong>| 15°</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" id="first-time-slot">12:00</h5>
          <p class="card-text"><strong>16</strong>| 15°</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" id="first-time-slot">12:00</h5>
          <p class="card-text"><strong>16</strong>| 15°</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" id="first-time-slot">12:00</h5>
          <p class="card-text"><strong>16</strong>| 15°</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" id="first-time-slot">12:00</h5>
          <p class="card-text"><strong>16</strong>| 15°</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" id="first-time-slot">12:00</h5>
          <p class="card-text"><strong>16</strong>| 15°</p>
      </div>
    </div>
    `;
}

function search(city) {
  let apiKey = "6f117e861b0b0140bf049ebef75f4075";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchFavoriteCity(event) {
  event.preventDefault();
  let currentPlace = document.querySelector("#city-input");
  search(currentPlace.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#todays-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;

  tempElement.innerHTML = Math.round * fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#todays-temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let formLocation = document.querySelector("#search-form");
formLocation.addEventListener("submit", searchFavoriteCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Salzburg");
