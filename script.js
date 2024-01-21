const apiKey = '40e81a0253df81e2dee425c869917cbb';
const baseUrlOne = 'https://api.openweathermap.org/data/2.5/weather';
const baseUrlTwo = 'https://api.openweathermap.org/data/2.5/forecast';
const units = 'metric'; // Setting the units to metric to get Celsius

// Function to fetch weather data by city name
async function fetchWeatherByCity(cityName) {

  //fetching current date weather conditions.
  const responseOne = await fetch(`${baseUrlOne}?q=${cityName}&units=${units}&appid=${apiKey}`)
    .catch(error => {
      console.error('Error:', error.message);
      throw error; // Re-throw the error to maintain the original behavior
    });

  try {
    const currentData = await responseOne.json();

    if (responseOne.ok) {
      // Data retrieval successful
      console.log('Current Weather data:', currentData);
      updateMainUI(currentData);
    } else {
      // Data retrieval failed
      console.error('Error fetching weather data:', currentData.message);
    }
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  }
  
  //fetching next 16 days weather forecasts
  const responseTwo = await fetch(`${baseUrlTwo}?q=${cityName}&units=${units}&appid=${apiKey}`)
    .catch(error => {
      console.error('Error:', error.message);
      throw error; // Re-throw the error to maintain the original behavior
    });

  try {
    const forecastData = await responseTwo.json();

    if (responseTwo.ok) {
      // Data retrieval successful
      console.log('Forecast Weather data:', forecastData);
      updateForecastUI(forecastData);
    } else {
      // Data retrieval failed
      console.error('Error fetching weather data:', forecastData.message);
    }
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
  }
};

function updateMainUI(data){
    //Displaying data on main weather card.
    let cityElement = document.querySelector(".city");
    let temperatureElement = document.querySelector(".temperature");
    let windSpeedElement = document.querySelector(".wind-speed");
    let humidityElement = document.querySelector(".humidity");
    let visibilityElement = document.querySelector(".visibility-distance");
    let descriptionElement = document.querySelector(".weather-description");
    let dateElement = document.querySelector(".date");
    let descriptionIcon = document.querySelector(".descritpion i");
    
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    visibilityElement.textContent = `${data.visibility/1000} km`;
    descriptionElement.textContent = data.weather[0].description;
    
    const weatherIconName = getWeatherIcon(data.weather[0].main)
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;    
    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();
};

function getWeatherIcon(weatherCondition){
  const iconMap = {
    Clear: "wb_sunny",
    Clouds: "wb_cloudy",
    Rain: "umbrella",
    Thunderstorm: "flash_on",
    Drizzle: "grain",
    Snow: "ac_unit",
    Mist: "cloud",
    smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud", 
  }

  return iconMap[weatherCondition] || "help"
}

function updateForecastUI(data){
  //Displaying data on weather today card
  let cardOneIcon = document.querySelector(".card-one i");
  let cardOneTemp = document.querySelector(".temp-one");
  let cardOneDescription = document.querySelector(".time-one");

  let cardTwoIcon = document.querySelector(".card-two i");
  let cardTwoTemp = document.querySelector(".temp-two");
  let cardTwoDescription = document.querySelector(".time-two");

  let cardThreeIcon = document.querySelector(".card-three i");
  let cardThreeTemp = document.querySelector(".temp-three");
  let cardThreeDescription = document.querySelector(".time-three");

  let cardFourIcon = document.querySelector(".card-four i");
  let cardFourTemp = document.querySelector(".temp-four");
  let cardFourDescription = document.querySelector(".time-four");

  let cardFiveIcon = document.querySelector(".card-five i");
  let cardFiveTemp = document.querySelector(".temp-five");
  let cardFiveDescription = document.querySelector(".time-five");

  let cardSixIcon = document.querySelector(".card-six i");
  let cardSixTemp = document.querySelector(".temp-six");
  let cardSixDescription = document.querySelector(".time-six");

  const forecastIconOne = getForecastIcon(data.list[0].weather[0].main);
  cardOneIcon.innerHTML = `<i class="material-icons">${forecastIconOne}</i>`;
  cardOneTemp.textContent = data.list[0].main.temp;
  cardOneDescription.textContent = data.list[0].dt_txt.split(' ')[1].substring(0, 5);
  
  const forecastIconTwo = getForecastIcon(data.list[1].weather[0].main);
  cardTwoIcon.innerHTML = `<i class="material-icons">${forecastIconTwo}</i>`;
  cardTwoTemp.textContent = data.list[1].main.temp;
  cardTwoDescription.textContent = data.list[1].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconThree = getForecastIcon(data.list[2].weather[0].main);
  cardThreeIcon.innerHTML = `<i class="material-icons">${forecastIconThree}</i>`;
  cardThreeTemp.textContent = data.list[2].main.temp;
  cardThreeDescription.textContent = data.list[2].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconFour = getForecastIcon(data.list[3].weather[0].main);
  cardFourIcon.innerHTML = `<i class="material-icons">${forecastIconFour}</i>`;
  cardFourTemp.textContent = data.list[3].main.temp;
  cardFourDescription.textContent = data.list[3].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconFive = getForecastIcon(data.list[4].weather[0].main);
  cardFiveIcon.innerHTML = `<i class="material-icons">${forecastIconFive}</i>`;
  cardFiveTemp.textContent = data.list[4].main.temp;
  cardFiveDescription.textContent = data.list[4].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconSix = getForecastIcon(data.list[5].weather[0].main);
  cardSixIcon.innerHTML = `<i class="material-icons">${forecastIconSix}</i>`;
  cardSixTemp.textContent = data.list[5].main.temp;
  cardSixDescription.textContent = data.list[5].dt_txt.split(' ')[1].substring(0, 5);

  function getForecastIcon(weatherCondition){
    const iconMap = {
      Clear: "wb_sunny",
      Clouds: "wb_cloudy",
      Rain: "umbrella",
      Thunderstorm: "flash_on",
      Drizzle: "grain",
      Snow: "ac_unit",
      Mist: "cloud",
      smoke: "cloud",
      Haze: "cloud",
      Fog: "cloud", 
    }
  
    return iconMap[weatherCondition] || "help"
  }
}

const formElement = document.querySelector(".search-form");
    const searchBarElement = document.querySelector('.search-bar')

    formElement.addEventListener('submit', function(e){
        e.preventDefault();

        const city = searchBarElement.value;

        if(city !== ""){
            fetchWeatherByCity(city);
            searchBarElement.value = '';
        }
});