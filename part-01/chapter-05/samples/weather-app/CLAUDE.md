# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static weather application displaying weather forecasts for multiple cities (Seoul, New York, Tokyo). Uses vanilla JavaScript with mock data - no build tools, bundlers, or external dependencies required.

## Running the App

Open `index.html` directly in a browser. No server or build process needed.

### Local Server (Optional)

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve
```

Access at `http://localhost:8080`

## Architecture

**Files:**
- `index.html` - Main HTML structure with placeholder elements for dynamic content
- `style.css` - All styling including weather-based background themes (sunny, cloudy, rainy, snowy, night)
- `app.js` - Application logic with mock weather data

**Data Flow:**
- Mock weather data defined in `weatherData` array at top of `app.js`
- `init()` bootstraps the app: creates city dots, renders weather, sets up event listeners
- `renderWeather()` is the main render function that updates all UI based on `currentCityIndex`
- Background color changes based on `conditionEn` property (applied as body class)

**Navigation:**
- City switching via prev/next buttons, dot indicators, keyboard arrows, or touch swipe
- `currentCityIndex` tracks active city, wraps around using modulo

**Korean UI:**
- Interface text is in Korean (e.g., "시간별 일기예보" for hourly forecast)
- City names stored in both Korean (`city`) and English (`cityEn`)
