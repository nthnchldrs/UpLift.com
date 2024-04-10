document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'c0b8585e4cff3b80bec2d38b783f77d0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=San Francisco,us&units=imperial&appid=${apiKey}`;

    function updateWeatherWidgetBackground(weatherCondition) {
        const weatherWidget = document.querySelector('.weather-widget');
        let backgroundImageUrl = '../assets/weatherWidget/day.jpg'; // Default image

        // Map weather conditions to images
        const weatherImages = {
            'Clear': '../assets/weatherWidget/day.jpg',
            'Clouds': '../assets/weatherWidget/cloudy.jpg',
            'Rain': '../assets/weatherWidget/rain.jpg',
            'Snow': '../assets/weatherWidget/snow.jpg',
            // Add more conditions as needed
        };

        if (weatherImages[weatherCondition]) {
            backgroundImageUrl = weatherImages[weatherCondition];
        }

        weatherWidget.style.backgroundImage = `url('${backgroundImageUrl}')`;
        weatherWidget.style.color = '#023047'; // Change text color for better visibility
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherCondition = data.weather[0].main;
            const temperature = data.main.temp;
            const location = data.name;

            document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById('temperature').textContent = `Temperature: ${temperature} °F`;
            document.getElementById('location').textContent = `Location: ${location}`;

            updateWeatherWidgetBackground(weatherCondition);
        })
        .catch(error => console.error('Error fetching weather data:', error));


    
});

