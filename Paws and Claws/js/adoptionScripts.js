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

    // Adoptables tab functionality

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
    var adoptableModal = document.getElementById("adoptable-modal");

    // Get all the links that open the modal
    var links = document.getElementsByClassName("open-modal");

    // When a link is clicked, open the modal and populate it with content
    Array.from(links).forEach(function (link) {
        link.onclick = function () {
            var title = this.dataset.title;
            var age = this.dataset.age;
            var imgSrc = this.closest('.adoptable-card').querySelector('.adoptable-image').src;

            adoptableModal.querySelector('.adoptable-modal-image').src = imgSrc;
            adoptableModal.querySelector('.adoptable-modal-title').textContent = title;
            adoptableModal.querySelector('.adoptable-modal-age').textContent = age;

            adoptableModal.style.display = "block";
        };
    });

    const adoptionModal = document.getElementById("adoptionModal");
    const confirmationModal = document.getElementById("confirmationModal");

    document.getElementById('adoptionButton').addEventListener('click', function () {
        adoptionModal.style.display = 'block';
    });

    // Handle closing modals via close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Adjusted closing modal logic when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Handle the adoption button click to open the adoption modal
    const adoptionBtn = document.getElementById('adoptionButton');
    if (adoptionBtn) {
        adoptionBtn.addEventListener('click', function () {
            adoptionModal.style.display = 'block';
        });
    }

    // Handle the adoption form submission
    const form = document.getElementById('adoptionForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            this.reset();
            adoptionModal.style.display = 'none';
            confirmationModal.style.display = 'block';
        });
    }
});
