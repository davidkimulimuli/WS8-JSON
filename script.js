console.log("SCRIPT LOADED");


// Store your OpenWeatherMap API key.
const apiKey = "3fcf81960fabea35c32798614c806a22";


// Find the HTML element where we display the weather data.
const weatherData = document.getElementById("weatherdata");


// Run this function when the user clicks the "Fetch data" button.
// async allows us to use await inside the function.
async function fetchWeather(cityName) {

    // If no city is provided, use the selected city from the dropdown.

    if (typeof cityName !== "string") {
    cityName = document.getElementById("city").value;
}

    console.log("Selected city:", cityName);

    weatherData.textContent = "Loading weather data...";


     // Display a loading message.
     weatherData.textContent = "Loading weather data...";

    // Try to fetch and process the weather data.
    try {
  

        // Send a GET request to the weather API and wait for the response.
        // q=Helsinki selects the city.
        // units=metric gives the temperature in Celsius.
        // mode=xml requests the data in XML format.
        // ${apiKey} inserts our API key into the URL.
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=xml&appid=${apiKey}`
        );
      

        // Check whether the API returned a successful HTTP status.
        if (!response.ok) {
        
         // Create an error and jump to the catch block.
         throw new Error(`HTTP error! Status: ${response.status}`);
        }
        

        // Read the response body as text and wait until it is ready.
        const xmlText = await response.text();

        // Convert the XML text into an XML document.
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

// Extract weather information from the XML.
        const city =
            xmlDoc.querySelector("city").getAttribute("name");

        const temperature =
            xmlDoc.querySelector("temperature").getAttribute("value");

        const humidity =
            xmlDoc.querySelector("humidity").getAttribute("value");

        const clouds =
            xmlDoc.querySelector("clouds").getAttribute("name");
        

        // Display the XML as plain text on the page.
        weatherData.innerHTML = `
            <h3>${city}</h3>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Cloudiness:</strong> ${clouds}</p>
        `;
       

    // Handle errors from the request or the code above.
    } catch (error) {
  

        // Choose an error message in the page's language.
        const message = "Failed to fetch weather data.";
   

        // Display the message and details of the error.
weatherData.textContent = `${message} ${error.message}`;
    }
}

// Run this function when the city dropdown value changes.
document
    .getElementById("city")
    .addEventListener("change", () => {
        fetchWeather();
    });

// Run this function when the user clicks the "Fetch data" button.
document
    .getElementById("fetchWeather")
    .addEventListener("click", () => {
        fetchWeather();
    });

// Run this function when the user clicks the "Search" button.
document
    .getElementById("search")
    .addEventListener("click", () => {

        const cityName =
            document.getElementById("citysearch").value.trim();

        if (cityName) {
            fetchWeather(cityName);
        }
    });