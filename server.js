const express = require('express');
const fetch = require('node-fetch');
const moment = require('moment');
const app = express();

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
// console.log(cityData);

const countryData = require('./countries.json');
// console.log(countryData);

app.get('/get_cities', async (req, res) => {
  console.log('received city request');
  console.log('Got body:', req.body);
  res.send(cityData);
})

app.get('/get_countries', async (req, res) => {
  console.log('received country request');
  console.log('Got body:', req.body);
  res.send(countryData);
})

app.post('/get_weather', async (req, res) => {
  console.log('received weather request');
  console.log('Got body:', req.body);

  city = req.body['city_name'];
  console.log(city);

  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
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