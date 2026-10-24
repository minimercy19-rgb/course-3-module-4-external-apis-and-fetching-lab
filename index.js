// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById('state-input');
const getAlertsBtn = document.getElementById('fetch-alerts');  
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

async function fetchWeatherAlerts() {
   
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
  alertsDisplay.innerHTML = '';

  const stateAbbr = stateInput.value.trim().toUpperCase();

  if (!stateAbbr || stateAbbr.length !== 2) {
    displayError('Please enter a valid 2-letter state abbreviation (e.g. NY, CA)');
    return;
  }

  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${stateAbbr}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

     
    stateInput.value = '';

    displayAlerts(data);

  } catch (error) {
    displayError(error.message);
  }
}

function displayAlerts(data) {
  const summary = document.createElement('h2');
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  const ul = document.createElement('ul');
  data.features.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });
  alertsDisplay.appendChild(ul);
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

 
getAlertsBtn.addEventListener('click', fetchWeatherAlerts);