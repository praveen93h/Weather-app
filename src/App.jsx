import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
    // State management
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [bgClass, setBgClass] = useState('default-bg');

    // API Key from environment variables
    const API_KEY = import.meta.env.VITE_API_KEY;

    // Fetch weather data
    const fetchWeather = async (city) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (data.cod === '404') {
                throw new Error('City not found');
            }

            updateBackground(data.weather[0].main);
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
            setBgClass('default-bg');
        } finally {
            setLoading(false);
        }
    };

    // Update background based on weather condition
    const updateBackground = (weatherCondition) => {
        const condition = weatherCondition.toLowerCase();

        if (condition.includes('rain')) setBgClass('rain-bg');
        else if (condition.includes('cloud')) setBgClass('clouds-bg');
        else if (condition.includes('clear')) setBgClass('clear-bg');
        else if (condition.includes('snow')) setBgClass('snow-bg');
        else if (condition.includes('thunder')) setBgClass('thunder-bg');
        else setBgClass('default-bg');
    };

    // Load default city on first render
    useEffect(() => {
        fetchWeather("London");
    }, []);

    return (
        <div className={`app ${bgClass}`}>
            <div className="container">
                <h1>Weather App</h1>
                <SearchBar onSearch={fetchWeather} />

                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">{error}</p>}
                {weather && !loading && <WeatherDisplay weather={weather} />}
            </div>
        </div>
    );
}

export default App;