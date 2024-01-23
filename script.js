const apiKey = '40e81a0253df81e2dee425c869917cbb';
const baseUrlOne = 'https://api.openweathermap.org/data/2.5/weather';
const baseUrlTwo = 'https://api.openweathermap.org/data/2.5/forecast';
const units = 'metric'; // Setting the units to metric to get Celsius
let barChart;

// Function to automatically search for a default city on page load
function autoSearchDefaultCity() {
  const defaultCity = 'Ahmedabad'; // Set your default city here
  fetchWeatherByCity(defaultCity);
}

// Attach the function to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', autoSearchDefaultCity);

document.addEventListener('DOMContentLoaded', function () {
  // On page load, create the chart with placeholder data
  plotForecastChart([], []);
});

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
      //plotForecastChart(forecastData);
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
    let countryCode = document.querySelector(".country-code");
    let temperatureElement = document.querySelector(".temperature");
    let windSpeedElement = document.querySelector(".wind-speed");
    let humidityElement = document.querySelector(".humidity");
    let visibilityElement = document.querySelector(".visibility-distance");
    let descriptionElement = document.querySelector(".weather-description");
    let dateElement = document.querySelector(".date");
    let descriptionIcon = document.querySelector(".descritpion i");
    
    cityElement.textContent = data.name;
    countryCode.textContent = ",   "+data.sys.country;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°`;
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
    Smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud", 
  }

  return iconMap[weatherCondition] || "help"
}

function updateForecastUI(data){

  //Extracting data for the bar chart
  const forecastTimes = data.list.slice(0, 6).map(entry => entry.dt_txt.split(' ')[1].substring(0, 5));
  const forecastTemps = data.list.slice(0, 6).map(entry => entry.main.temp);

  console.log(forecastTemps, forecastTimes);

  //Displaying data on weather today card
  let cardOneIcon = document.querySelector(".card-one i");
  let cardOneTemp = document.querySelector(".temp-one");
  let cardFeelOne = document.querySelector(".feel-one");
  let cardOneDescription = document.querySelector(".time-one");

  let cardTwoIcon = document.querySelector(".card-two i");
  let cardTwoTemp = document.querySelector(".temp-two");
  let cardFeelTwo = document.querySelector(".feel-two");
  let cardTwoDescription = document.querySelector(".time-two");

  let cardThreeIcon = document.querySelector(".card-three i");
  let cardThreeTemp = document.querySelector(".temp-three");
  let cardFeelThree = document.querySelector(".feel-three");
  let cardThreeDescription = document.querySelector(".time-three");

  let cardFourIcon = document.querySelector(".card-four i");
  let cardFourTemp = document.querySelector(".temp-four");
  let cardFeelFour = document.querySelector(".feel-four");
  let cardFourDescription = document.querySelector(".time-four");

  let cardFiveIcon = document.querySelector(".card-five i");
  let cardFiveTemp = document.querySelector(".temp-five");
  let cardFeelFive = document.querySelector(".feel-five");
  let cardFiveDescription = document.querySelector(".time-five");

  let cardSixIcon = document.querySelector(".card-six i");
  let cardSixTemp = document.querySelector(".temp-six");
  let cardSixFeel = document.querySelector(".feel-six");
  let cardSixDescription = document.querySelector(".time-six");
  
  const forecastIconOne = getForecastIcon(data.list[0].weather[0].main);
  cardOneIcon.innerHTML = `<i class="material-icons">${forecastIconOne}</i>`;
  cardOneTemp.textContent = "Temp: "+data.list[0].main.temp;
  cardFeelOne.textContent = "Feels like: "+data.list[0].main.feels_like;
  cardOneDescription.textContent = "Time: "+data.list[0].dt_txt.split(' ')[1].substring(0, 5);
  
  const forecastIconTwo = getForecastIcon(data.list[1].weather[0].main);
  cardTwoIcon.innerHTML = `<i class="material-icons">${forecastIconTwo}</i>`;
  cardTwoTemp.textContent = "Temp: "+data.list[1].main.temp;
  cardFeelTwo.textContent = "Feels like: "+data.list[1].main.feels_like;
  cardTwoDescription.textContent = "Time: "+data.list[1].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconThree = getForecastIcon(data.list[2].weather[0].main);
  cardThreeIcon.innerHTML = `<i class="material-icons">${forecastIconThree}</i>`;
  cardThreeTemp.textContent = "Temp: "+data.list[2].main.temp;
  cardFeelThree.textContent = "Feels like: "+data.list[2].main.feels_like;
  cardThreeDescription.textContent = "Time: "+data.list[2].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconFour = getForecastIcon(data.list[3].weather[0].main);
  cardFourIcon.innerHTML = `<i class="material-icons">${forecastIconFour}</i>`;
  cardFourTemp.textContent = "Temp: "+data.list[3].main.temp;
  cardFeelFour.textContent = "Feels like: "+data.list[3].main.feels_like;
  cardFourDescription.textContent = "Time: "+data.list[3].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconFive = getForecastIcon(data.list[4].weather[0].main);
  cardFiveIcon.innerHTML = `<i class="material-icons">${forecastIconFive}</i>`;
  cardFiveTemp.textContent = "Temp: "+data.list[4].main.temp;
  cardFeelFive.textContent = "Feels like: "+data.list[4].main.feels_like;
  cardFiveDescription.textContent = "Time: "+data.list[4].dt_txt.split(' ')[1].substring(0, 5);

  const forecastIconSix = getForecastIcon(data.list[5].weather[0].main);
  cardSixIcon.innerHTML = `<i class="material-icons">${forecastIconSix}</i>`;
  cardSixTemp.textContent = "Temp: "+data.list[5].main.temp;
  cardSixFeel.textContent = "Feels like: "+data.list[5].main.feels_like;
  cardSixDescription.textContent = "Time: "+data.list[5].dt_txt.split(' ')[1].substring(0, 5);

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

  //Calling the chart function
  plotForecastChart(forecastTimes, forecastTemps);
}

//Creating chart
function plotForecastChart(labels, data){
  const ctx = document.getElementById('forecastChart').getContext('2d');
  // Check if the chart instance already exists
  if (barChart) {
    // If it exists, update the chart data
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = data;
    barChart.update(); // Update the chart
  } else {
    // If it doesn't exist, create a new chart
    barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature Against Time',
          data: data,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 5,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

const formElement = document.querySelector(".search-form");
const searchBarElement = document.querySelector('.search-bar');
const searchButtonIcon = document.querySelector('.search-btn i');

function handleSearch() {
    const city = searchBarElement.value.trim();

    if (city) {
        fetchWeatherByCity(city);
        searchBarElement.value = '';
    }
}

formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSearch();
});

searchButtonIcon.addEventListener('click', handleSearch);