function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let discriptionElement = document.querySelector("#weather-discription");
  let humidityElement = document.querySelector("#humidity-percentage");
  let windElement = document.querySelector("#wind-mph");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#emoji");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  discriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}mph`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "44ebfbe3f90e8afo31a00943c4996bft";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "44ebfbe3f90e8afo31a00943c4996bft";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastElement = "";

  days.forEach(function (day) {
    forecastElement =
      forecastElement +
      `
          <div class="weather-forecast">
           <ul> <li> <span class="date-day"> ${day} </span></li>
              <br>
                <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
                alt=""
                width="36"
              />
              <br>
              <span class="forecast-temp">
              <li> <span class="max-temp">18˚</span>
                  <span class="min-temp">12˚</span>
                  </li>
            </span>
            </ul>
          </div>`;
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastElement;
}

let searchFormElement = document.querySelector("#add-your-city");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Chicago");
displayForecast();
