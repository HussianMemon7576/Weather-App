let day = document.getElementById("day");
let date = document.getElementById("date");
let searchInput = document.getElementById("search-input");
let btn = document.getElementById("btn");
let city_name = document.getElementById("city-name");
let Humidity = document.getElementById("Humidity");
let wind_speed = document.getElementById("wind-speed");
let pressure = document.getElementById("Pressure");
let temaprature = document.getElementById("temprature");
let feelsLike = document.getElementById("feels-like");
let visibility = document.getElementById("visibility");
let description = document.getElementById("description");
let left = document.querySelector(".left");
let weather_container = document.getElementById("weather-details");
let loader = document.getElementById("loader");
let weatherEmoji = document.getElementById("weather-emoji");

function getDay() {
    let today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    day.textContent = days[today.getDay()];
    date.textContent = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
}

getDay();

function validateInput(inp) {
    if (inp.trim() === "") {
        alert("Please enter a city name.");
        return false;
    }
    if (!isNaN(inp.trim())) {
        alert("City name cannot be a number.");
        return false;
    }
    return true;
}

function loadEmoji(condition) {
    const map = {
        "thunderstorm": "⛈️",
        "drizzle": "🌦️",
        "rain": "🌧️",
        "snow": "❄️",
        "mist": "🌫️",
        "smoke": "🌫️",
        "haze": "🌫️",
        "fog": "🌫️",
        "dust": "🌪️",
        "sand": "🌪️",
        "ash": "🌋",
        "squall": "💨",
        "tornado": "🌪️",
        "clear": "☀️",
        "clouds": "☁️",
    };
    weatherEmoji.textContent = map[condition.toLowerCase()] || "🌤️";
}

async function getWeather(city) {
    loader.classList.remove("hidden");
    weather_container.classList.remove("load");

    try {
        const apikey = "b610ce0c4ef32ec0d1fb2cf371478f63";

        const getdata = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}`
        );

        const data = await getdata.json();

        loader.classList.add("hidden");

        if (Number(data.cod) !== 200) {
            alert(data.message);
            return;
        }

        loadEmoji(data.weather[0].main);

        left.classList.add("active");

        city_name.textContent = `${data.name}, ${data.sys.country}`;
        Humidity.textContent = `${data.main.humidity}%`;
        wind_speed.textContent = `${data.wind.speed} m/s`;
        pressure.textContent = `${data.main.pressure} hPa`;
        temaprature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        feelsLike.textContent = `${Math.round(data.main.feels_like - 273.15)}°C`;
        visibility.textContent = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : "N/A";
        description.textContent = data.weather[0].description;

        weather_container.classList.add("load");

    } catch (error) {
        loader.classList.add("hidden");
        console.error("Error fetching weather data:", error);
        alert("Something went wrong. Please check your internet connection.");
    }
}

btn.addEventListener("click", () => {
    const city = searchInput.value;
    if (!validateInput(city)) return;
    getWeather(city);
    searchInput.value = "";
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = searchInput.value;
        if (!validateInput(city)) return;
        getWeather(city);
        searchInput.value = "";
    }
});