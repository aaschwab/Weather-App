function refreshWeather(response) {
  console.log(response.data.temperature.current);
}

function searchCity(city) {
  let apiKey = "44ebfbe3f90e8afo31a00943c4996bft";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#add-your-city");
searchFormElement.addEventListener("submit", handleSearchSubmit);
