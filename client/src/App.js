import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import './styles/output.css';

function App () {
  const [weatherData, setWeather] = useState(null);
  const [city, setCity] = useState('city');
  const [isError, setError] = useState(false);
  const [cityList, setCityList] = useState(null);
  const [countryList, setCountryList] = useState(null);

  async function fetchWeather() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city_name: city })
    };

    await fetch('/get_weather', requestOptions)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
      .catch(error => {
        setError(error);
      });
  }

  async function fetchCities() {
    await fetch('/get_cities')
      .then(response => response.json())
      .then(data => {
        setCityList(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error); 
      });
  }


  async function fetchCountries() {
    await fetch('/get_countries')
      .then(response => response.json())
      .then(data => {
        setCountryList(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error); 
      });
  }

  useEffect( () => {
    fetchCities();
    fetchCountries();
  }, []);


  const handleChange = (event) => {
    setCity(event.target.value.toLowerCase());
  }


  const handleSubmit = (event) => {
    fetchWeather(); 
    event.preventDefault();
  }


  const handleCountrySelect = (event, value, reason)=> {
    console.log(value.name);
  }

  
if(countryList) {

  return (
    //  { code: 'AD', label: 'Andorra', phone: '376' },

    <Autocomplete
      id="country-select-demo"
      style={{ width: 300 }}
      options={ countryList }
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(option) => (
        <>{ option.name } ({option.code})</>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
      onChange={handleCountrySelect}
    />
  )
}

else return (<h3>wait</h3> )
  // if(!cityList) {
  //   return (
  //     <Container className={'main-container'}>
  //       <h3>Waiting...</h3>
  //     </Container>
  //   )
  // }
  // else {
  //   return (
  //     <Container className={'main-container'}>
  //       <h3>Display data</h3>
  //     </Container>
      
  //   )
  // }

};

export default App;