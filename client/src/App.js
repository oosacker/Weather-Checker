import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './styles/output.css';

const App = () => {
  const [weatherData, setWeather] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [countryList, setcountryList] = useState([]);
  const [cityList, setcityList] = useState([]);

  useEffect( () => {
    fetchCountries();
  }, []);

  useEffect( () => {
    console.log(`currentCountry`, currentCountry);
    fetchCities();
  }, [currentCountry]);

  useEffect( () => {
    console.log(`currentCity`, currentCity);
    fetchWeather();
  }, [currentCity]);

  useEffect( () => {
    console.log(`weatherData`, weatherData);
  }, [weatherData]);


  const fetchCountries = () => {
    fetch('/get_countries')
      .then(response => response.json())
      .then(data => {
        setcountryList(data);
      })
      .catch(error => {
        alert(error); 
      });
  }

  const fetchCities = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country_code: currentCountry.code })
    };
    fetch('/get_cities', requestOptions)
      .then(response => response.json())
      .then(data => {
        setcityList(data);
      })
      .catch(error => {
        alert(error); 
      });
  }

  const fetchWeather = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city_id: currentCity.id })
    };

    fetch('/get_weather', requestOptions)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
      .catch(error => {
        alert(error);
      });
  }


  const handleCountrySelect = (event, value, reason)=> {
    if(value) {
      setCurrentCountry(value);
    }
    else {
      console.log('no country selected');
    }
  }

  const handleCitySelect = (event, value, reason)=> {
    if(value) {
      setCurrentCity(value);
    }
    else {
      console.log('no city selected');
    }
  }

  return (
    <Container className={'main-container'}>

      <Container className={'title-box'}>
        <h1 className={'title'}>Weather Checker v2</h1>
        <h3 className={'sub-title'}>Natsuki Hasegawa, 2020</h3>
        <p>A simple web app that demonstrates a Node.js/Express backend server and a React frontend. The backend fetches the weather data for the selected city from OpenWeatherMap's API. The backend itself also implements a RESTful API for the frontend interface.</p>
      </Container>
    
      <Container className={'selection-box'}>
      {countryList && (
        <Row align={'center'} justify={'center'} className={'row-1'}>
          <Autocomplete
            options={countryList}
            getOptionLabel={(country) => country.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
            onChange={handleCountrySelect}
          />
        </Row>
      )}

      {cityList && (
        <Row align={'center'} justify={'center'} className={'row-2'}>
          <Autocomplete
            options={cityList}
            getOptionLabel={(city) => city.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
            onChange={handleCitySelect}
          />
        </Row>
      )}
      </Container>

      {weatherData.main && (
        <Container className={'weather-result'}>
          <Row align={'center'} justify={'center'} className={'row-3'}>
            <Container className={'weather-result-inner'}>
              <h3 className={'city-name'}>{weatherData.name.toUpperCase()}</h3>
              <p>Temperature: {weatherData.main.temp} degC</p>
              <p>Feels like: {weatherData.main.feels_like} degC</p>
              <p>Humidity: {weatherData.main.humidity} %</p>
              <div className='weather-icon-container'>
                <img 
                  className={'weather-icon'} 
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}>
                </img>
              </div>
              <p>{weatherData.weather[0].main +': '+ weatherData.weather[0].description} </p>
            </Container>
          </Row>
        </Container>
      )}

    </Container>
  )
}
export default App;