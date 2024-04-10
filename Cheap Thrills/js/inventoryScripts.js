document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'c0b8585e4cff3b80bec2d38b783f77d0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=San Francisco,us&units=imperial&appid=${apiKey}`;

    function updateWeatherWidgetBackground(weatherCondition) {
        const weatherWidget = document.querySelector('.weather-widget');
        let backgroundImageUrl = '../../assets/weatherWidget/day.jpg'; // Default image

        // Map weather conditions to images
        const weatherImages = {
            'Clear': '../../assets/weatherWidget/day.jpg',
            'Clouds': '../../assets/weatherWidget/cloudy.jpg',
            'Rain': '../../assets/weatherWidget/rain.jpg',
            'Snow': '../../assets/weatherWidget/snow.jpg',
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

     // Inventory

    const tabs = document.querySelectorAll('.tab-links a');
    const tabContents = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href').replace('#', '');

            // Remove active classes
            tabs.forEach(t => t.parentNode.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            // Add active class to current tab and content
            this.parentNode.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Get the modal
    var modal = document.getElementById("item-modal");

    // Get all the links that open the modal
    var links = document.getElementsByClassName("open-modal");

    // When a link is clicked, open the modal and populate it with content
    Array.from(links).forEach(function (link) {
        link.onclick = function () {
            var title = this.dataset.title;
            var price = this.dataset.price;
            var imgSrc = this.closest('.item-card').querySelector('.item-image').src;

            modal.querySelector('.modal-image').src = imgSrc;
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-price').textContent = price;

            modal.style.display = "block";
        };
    });

    // Get the element that closes the modal
    var closeModal = document.getElementsByClassName("close-modal")[0];

    // When the close button is clicked, close the modal
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Also close the modal when the user clicks anywhere outside of the modal content
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

});

