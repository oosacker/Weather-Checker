const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser');

const app = express();

require('dotenv').config();
const API_KEY = process.env.WEATHER_API_KEY;
const port = process.env.PORT;

let weatherData = null;
let city = 'wellington';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  console.log(req.body['username']);
  res.sendStatus(200);
});

// create a GET route -- MUST BE MARKED async and await so you can until valid data is available!!
app.get('/get_data', async (req, res) => {

  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => {
      return response.text();
    })
    .then(data => {
      weatherData = JSON.parse(data);
      console.log(weatherData);
    })
    .catch(err => console.log(err))

  console.log(req);
  res.send(weatherData);
});


app.post('/get_weather', async (req, res) => {
  console.log('received request');
  // console.log(req);

  console.log('Got body:', req.body);
  // res.sendStatus(200);
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

  // console.log(req);
  res.send(weatherData);
});


app.post('/post_data', (req, res) => {
  console.log(req);
  res.send('hi');
});