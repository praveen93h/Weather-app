import Lottie from 'lottie-react';
import sunny from '../assets/animations/sunny.json';
import cloudy from '../assets/animations/cloudy.json';
import rain from '../assets/animations/rain.json';
import thunderstorm from '../assets/animations/thunderstorm.json';

const iconMap = {
    '01': sunny,       // Clear
    '02': cloudy,      // Few clouds
    '03': cloudy,      // Scattered clouds
    '04': cloudy,      // Broken clouds
    '09': rain,        // Shower rain
    '10': rain,        // Rain
    '11': thunderstorm,// Thunderstorm
    '13': sunny,       // Snow
    '50': cloudy       // Mist
};

export default function AnimatedIcon({ iconCode }) {
    const animationData = iconMap[iconCode.substring(0, 2)] || sunny;

    return (
        <div className="weather-icon">
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: 120, height: 120 }}
            />
        </div>
    );
}