const express = require('express');
const fetch = require('node-fetch');
const moment = require('moment');
const app = express();
const path = require('path');

require('dotenv').config();
const API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 5000;

//middleware
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} @ ${moment().format()}`);
  next();
}
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let weatherData = null;
let city = 'wellington';

const cityData = require('./city.list.json');
const countryData = require('./countries.json');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/get_countries', (req, res) => {
  console.log('received country request');
  res.send(countryData);
})

app.post('/get_cities', (req, res) => {
  console.log('received city request');
  console.log('code:', req.body.country_code);
  let citiesInCountry = cityData.filter(city => city.country === req.body.country_code);
  res.send(citiesInCountry);
})


app.post('/get_weather', async (req, res) => {
  console.log('received weather request');
  console.log('Got body:', req.body);

  cityID = req.body['city_id'];
  console.log(city);

  await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${API_KEY}`)
    .then(response => {
      return response.text();
    })
    .then(data => {
      weatherData = JSON.parse(data);
      console.log(weatherData);
    })
    .catch(err => console.log(err))

  res.send(weatherData);
});

// console.log that your server is up and running
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));