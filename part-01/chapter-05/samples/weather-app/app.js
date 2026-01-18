// Mock Weather Data
const weatherData = [
    {
        city: "서울",
        cityEn: "Seoul",
        currentTemp: 5,
        condition: "맑음",
        conditionEn: "sunny",
        high: 8,
        low: -2,
        hourly: [
            { time: "지금", icon: "☀️", temp: 5 },
            { time: "10시", icon: "☀️", temp: 6 },
            { time: "11시", icon: "🌤️", temp: 7 },
            { time: "12시", icon: "🌤️", temp: 8 },
            { time: "13시", icon: "☀️", temp: 8 },
            { time: "14시", icon: "☀️", temp: 7 },
            { time: "15시", icon: "🌤️", temp: 6 },
            { time: "16시", icon: "🌤️", temp: 5 },
            { time: "17시", icon: "🌙", temp: 3 },
            { time: "18시", icon: "🌙", temp: 2 },
            { time: "19시", icon: "🌙", temp: 1 },
            { time: "20시", icon: "🌙", temp: 0 }
        ],
        weekly: [
            { day: "오늘", icon: "☀️", low: -2, high: 8 },
            { day: "월", icon: "🌤️", low: -1, high: 9 },
            { day: "화", icon: "☁️", low: 0, high: 7 },
            { day: "수", icon: "🌧️", low: 2, high: 6 },
            { day: "목", icon: "🌧️", low: 1, high: 5 },
            { day: "금", icon: "🌤️", low: -1, high: 7 },
            { day: "토", icon: "☀️", low: -3, high: 8 }
        ]
    },
    {
        city: "뉴욕",
        cityEn: "New York",
        currentTemp: -3,
        condition: "눈",
        conditionEn: "snowy",
        high: 0,
        low: -8,
        hourly: [
            { time: "지금", icon: "❄️", temp: -3 },
            { time: "10시", icon: "❄️", temp: -2 },
            { time: "11시", icon: "🌨️", temp: -1 },
            { time: "12시", icon: "🌨️", temp: 0 },
            { time: "13시", icon: "🌨️", temp: 0 },
            { time: "14시", icon: "❄️", temp: -1 },
            { time: "15시", icon: "❄️", temp: -2 },
            { time: "16시", icon: "❄️", temp: -3 },
            { time: "17시", icon: "🌙", temp: -5 },
            { time: "18시", icon: "🌙", temp: -6 },
            { time: "19시", icon: "🌙", temp: -7 },
            { time: "20시", icon: "🌙", temp: -8 }
        ],
        weekly: [
            { day: "오늘", icon: "❄️", low: -8, high: 0 },
            { day: "월", icon: "🌨️", low: -5, high: 2 },
            { day: "화", icon: "☁️", low: -3, high: 4 },
            { day: "수", icon: "🌤️", low: -2, high: 5 },
            { day: "목", icon: "☀️", low: -1, high: 6 },
            { day: "금", icon: "☀️", low: 0, high: 7 },
            { day: "토", icon: "🌤️", low: -2, high: 5 }
        ]
    },
    {
        city: "도쿄",
        cityEn: "Tokyo",
        currentTemp: 12,
        condition: "구름 조금",
        conditionEn: "cloudy",
        high: 15,
        low: 8,
        hourly: [
            { time: "지금", icon: "🌤️", temp: 12 },
            { time: "10시", icon: "🌤️", temp: 13 },
            { time: "11시", icon: "☀️", temp: 14 },
            { time: "12시", icon: "☀️", temp: 15 },
            { time: "13시", icon: "☀️", temp: 15 },
            { time: "14시", icon: "🌤️", temp: 14 },
            { time: "15시", icon: "🌤️", temp: 13 },
            { time: "16시", icon: "🌤️", temp: 12 },
            { time: "17시", icon: "🌙", temp: 11 },
            { time: "18시", icon: "🌙", temp: 10 },
            { time: "19시", icon: "🌙", temp: 9 },
            { time: "20시", icon: "🌙", temp: 8 }
        ],
        weekly: [
            { day: "오늘", icon: "🌤️", low: 8, high: 15 },
            { day: "월", icon: "☀️", low: 9, high: 17 },
            { day: "화", icon: "☀️", low: 10, high: 18 },
            { day: "수", icon: "🌧️", low: 11, high: 14 },
            { day: "목", icon: "🌧️", low: 10, high: 13 },
            { day: "금", icon: "🌤️", low: 8, high: 15 },
            { day: "토", icon: "☀️", low: 7, high: 16 }
        ]
    }
];

let currentCityIndex = 0;

// DOM Elements
const cityName = document.getElementById('cityName');
const currentTemp = document.getElementById('currentTemp');
const condition = document.getElementById('condition');
const highLow = document.getElementById('highLow');
const hourlyScroll = document.getElementById('hourlyScroll');
const weeklyList = document.getElementById('weeklyList');
const cityDots = document.getElementById('cityDots');
const prevBtn = document.getElementById('prevCity');
const nextBtn = document.getElementById('nextCity');

// Initialize
function init() {
    createDots();
    renderWeather();
    setupEventListeners();
}

// Create city indicator dots
function createDots() {
    cityDots.innerHTML = weatherData.map((_, index) =>
        `<div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
    ).join('');
}

// Update dots
function updateDots() {
    const dots = cityDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCityIndex);
    });
}

// Render weather for current city
function renderWeather() {
    const data = weatherData[currentCityIndex];

    // Update background
    document.body.className = data.conditionEn;

    // Update header
    cityName.textContent = data.city;
    currentTemp.textContent = `${data.currentTemp}°`;
    condition.textContent = data.condition;
    highLow.textContent = `최고:${data.high}° 최저:${data.low}°`;

    // Render hourly forecast
    renderHourly(data.hourly);

    // Render weekly forecast
    renderWeekly(data.weekly);

    // Update dots
    updateDots();
}

// Render hourly forecast
function renderHourly(hourly) {
    hourlyScroll.innerHTML = hourly.map(item => `
        <div class="hourly-item">
            <span class="time">${item.time}</span>
            <span class="weather-icon">${item.icon}</span>
            <span class="temp">${item.temp}°</span>
        </div>
    `).join('');
}

// Render weekly forecast
function renderWeekly(weekly) {
    // Find min and max for the week to calculate bar width
    const allTemps = weekly.flatMap(day => [day.low, day.high]);
    const minTemp = Math.min(...allTemps);
    const maxTemp = Math.max(...allTemps);
    const range = maxTemp - minTemp;

    weeklyList.innerHTML = weekly.map(day => {
        const leftPercent = ((day.low - minTemp) / range) * 100;
        const widthPercent = ((day.high - day.low) / range) * 100;

        return `
            <div class="weekly-item">
                <span class="day">${day.day}</span>
                <span class="weather-icon">${day.icon}</span>
                <div class="temp-range">
                    <span class="temp-low">${day.low}°</span>
                    <div class="temp-bar">
                        <div class="temp-bar-fill" style="left: ${leftPercent}%; width: ${widthPercent}%"></div>
                    </div>
                    <span class="temp-high">${day.high}°</span>
                </div>
            </div>
        `;
    }).join('');
}

// Navigate to next city
function nextCity() {
    currentCityIndex = (currentCityIndex + 1) % weatherData.length;
    renderWeather();
}

// Navigate to previous city
function prevCity() {
    currentCityIndex = (currentCityIndex - 1 + weatherData.length) % weatherData.length;
    renderWeather();
}

// Setup event listeners
function setupEventListeners() {
    nextBtn.addEventListener('click', nextCity);
    prevBtn.addEventListener('click', prevCity);

    // Click on dots
    cityDots.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            currentCityIndex = parseInt(e.target.dataset.index);
            renderWeather();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextCity();
        if (e.key === 'ArrowLeft') prevCity();
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const weatherCard = document.getElementById('weatherCard');

    weatherCard.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    weatherCard.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextCity();
            } else {
                prevCity();
            }
        }
    }
}

// Start the app
init();
