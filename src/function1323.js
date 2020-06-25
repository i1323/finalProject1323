function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#todays-temperature");
  let cityElement = document.querySelector("#currentCity");
  let descriptionElement = document.querySelector("#todays-description");
  let minElement = document.querySelector("#mini");
  let maxElement = document.querySelector("#max");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "6f117e861b0b0140bf049ebef75f4075";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
