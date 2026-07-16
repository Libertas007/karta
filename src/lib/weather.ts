export async function getWeather(
    lat: number,
    lon: number,
): Promise<WeatherData> {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

export function getWeatherIcon(
    code: number,
    sunrise: number,
    sunset: number,
): string {
    const now = Math.floor(Date.now() / 1000);

    if (code >= 200 && code < 300) {
        return "bolt";
    }

    if (code >= 300 && code < 600) {
        return "cloud-rain";
    }

    if (code >= 600 && code < 700) {
        if (now >= sunrise && now < sunset) {
            return "cloud-rain";
        } else {
            return "moon";
        }
    }

    if (code >= 700 && code < 800) {
        return "cloud-fog";
    }

    if (now >= sunrise && now < sunset) {
        return "sun";
    } else {
        return "moon";
    }
}

export interface WeatherData {
    coord: WeatherDataCoord;
    weather: WeatherDataWeather[];
    base: string;
    main: WeatherDataMain;
    visibility: number;
    wind: WeatherDataWind;
    clouds: WeatherDataClouds;
    dt: number;
    sys: WeatherDataSys;
    rain?: WeatherDataPercipitation;
    snow?: WeatherDataPercipitation;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherDataPercipitation {
    "1h"?: number;
}

export interface WeatherDataCoord {
    lon: number;
    lat: number;
}

export interface WeatherDataMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface WeatherDataWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherDataWind {
    speed: number;
    deg: number;
    gust: number;
}

export interface WeatherDataClouds {
    all: number;
}

export interface WeatherDataSys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}
