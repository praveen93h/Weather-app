import AnimatedIcon from './AnimatedIcon';
export default function WeatherDisplay({ weather }) {
    if (!weather?.weather) return <p className="loading">Loading or no data...</p>;

    //const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
    //const weatherClass = weather.weather[0].main.toLowerCase();
    return (
        <div className={`weather-card ${weather.weather[0].main.toLowerCase()}-card`}>
            <h2>{weather.name}, {weather.sys?.country}</h2>
            <AnimatedIcon iconCode={weather.weather[0].icon} />

            <div className="weather-stats">
                <p>🌡️ {weather.main?.temp}°C</p>
                <p>💧 {weather.main?.humidity}%</p>
                <p>🌬️ {weather.wind?.speed} m/s</p>
                <p>👁️ {weather.visibility / 1000} km</p>
            </div>

            <p className="weather-desc">{weather.weather[0].description}</p>
        </div>
    );
}