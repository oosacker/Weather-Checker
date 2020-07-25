const express = require('express');
const fetch = require('node-fetch');
const moment = require('moment');
const app = express();

require('dotenv').config();
const API_KEY = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 5000;


// console.log that your server is up and running
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

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

// test code
// const testarray = [
//   {
//     id: 0,
//     name: "natsuki",
//     age: 36
//   },
//   {
//     id: 1,
//     name: "bob",
//     age: 55
//   },
//   {
//     id: 2,
//     name: "andy",
//     age: 90
//   },
// ];

// app.get('/test', (req, res) => {
//   res.json(testarray);
// })


// app.post('/post_test', (req, res) => {
//   console.log('Got body:', req.body);
//   console.log(req.body['username']);
//   // res.sendStatus(200);
//   res.send(req.body);
// });

// create a GET route -- MUST BE MARKED async and await so you can until valid data is available!!
// app.get('/get_data', async (req, res) => {

//   await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
//     .then(response => {
//       return response.text();
//     })
//     .then(data => {
//       weatherData = JSON.parse(data);
//       console.log(weatherData);
//     })
//     .catch(err => console.log(err))

//   console.log(req);
//   res.send(weatherData);
// });


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