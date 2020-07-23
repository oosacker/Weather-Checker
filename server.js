const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('node-fetch');

require('dotenv').config();
const API_KEY = process.env.WEATHER_API_KEY;

let weatherData = null;
let city = 'wellington';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
  .then(response => {
    return response.text();
  })
  .then(data => {
    weatherData = JSON.parse(data);
    console.log(weatherData);
  })
  .catch(err => console.log(err))

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/get_data', (req, res) => {
  res.send(weatherData);
});