const apiKey = '40e81a0253df81e2dee425c869917cbb';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const units = 'metric'; // Setting the units to metric to get Celsius

// Function to fetch weather data by city name
async function fetchWeatherByCity(cityName) {
  const response = await fetch(`${baseUrl}?q=${cityName}&units=${units}&appid=${apiKey}`)
    .catch(error => {
      console.error('Error:', error.message);
      throw error; // Re-throw the error to maintain the original behavior
    });

  try {
    const data = await response.json();

    if (response.ok) {
      // Data retrieval successful
      console.log('Weather data:', data);
      updateWeatheronUI(data);
    } else {
      // Data retrieval failed
      console.error('Error fetching weather data:', data.message);
    }
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  }
};

function updateWeatheronUI(data){
    const cityElement = document.querySelector(".city");
    const temperatureElement = document.querySelector(".temperature");
    const windSpeedElement = document.querySelector(".wind-speed");
    const humidityElement = document.querySelector(".humidity");
    const visibilityElement = document.querySelector(".visibility-distance");
    const descriptionElement = document.querySelector(".weather-description");
    const dateElement = document.querySelector(".date");
    const weatherIcon = document.querySelector(".description i"); 
    
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    visibilityElement.textContent = `${data.visibility/1000} km`;
    descriptionElement.textContent = data.weather[0].description;

    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();
};

const formElement = document.querySelector(".search-form");
    const searchBarElement = document.querySelector('.search-bar')

    formElement.addEventListener('submit', function(e){
        e.preventDefault();

        const city = searchBarElement.value;

        if(city !== ""){
            fetchWeatherByCity(city);
            searchBarElement.value = '';
        }
})








