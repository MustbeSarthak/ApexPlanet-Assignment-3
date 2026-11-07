const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
const forecastUrl = "https://api.open-meteo.com/v1/forecast";
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const formMessage = document.querySelector("#form-message");
const weatherResult = document.querySelector("#weather-result");

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

function setMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.className = isError ? "form-message error" : "form-message";
}

function renderWeather(location, current) {
  weatherResult.replaceChildren();
  const title = document.createElement("h2");
  title.textContent = `Weather in ${location.name}, ${location.country}`;

  const details = document.createElement("dl");
  details.className = "weather-details";
  const values = [
    ["Condition", weatherDescriptions[current.weather_code] || "Conditions unavailable"],
    ["Temperature", `${current.temperature_2m} °C`],
    ["Wind speed", `${current.wind_speed_10m} km/h`]
  ];

  values.forEach(([label, value]) => {
    const group = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    group.append(term, description);
    details.append(group);
  });

  weatherResult.append(title, details);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("The weather service is unavailable.");
  }
  return response.json();
}

async function findWeather(city) {
  const geocodingParams = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json"
  });
  const locations = await fetchJson(`${geocodingUrl}?${geocodingParams}`);
  if (!locations.results || locations.results.length === 0) {
    throw new Error("City not found. Check the spelling and try again.");
  }

  const location = locations.results[0];
  const forecastParams = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,wind_speed_10m,weather_code",
    timezone: "auto"
  });
  const forecast = await fetchJson(`${forecastUrl}?${forecastParams}`);
  return { location, current: forecast.current };
}

async function handleWeatherSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  weatherResult.replaceChildren();

  if (!city) {
    setMessage("Please enter a city name.", true);
    cityInput.focus();
    return;
  }

  setMessage("Loading weather...");
  try {
    const weather = await findWeather(city);
    renderWeather(weather.location, weather.current);
    setMessage("");
  } catch (error) {
    const message = error instanceof TypeError
      ? "Unable to connect. Check your internet connection and try again."
      : error.message;
    setMessage(message, true);
  }
}

weatherForm.addEventListener("submit", handleWeatherSubmit);
