import React, {useState, useEffect} from 'react';

function App () {
  const [myData, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getData() {
    console.log('getData');

    await fetch(`/get_data`)
      .then(res => res.json())
      .then(
        result => {
          setData(result);
          console.log(result);
          setIsLoaded(true);
        },
        error => {
          alert(error)
        }
      )
      .catch (error => {
        alert(error);
      })
  }

  useEffect(() => {
    getData();
  },[]);


  if (!isLoaded) {
    console.log('Waiting');
    return (
      <div>Waiting...</div>
    )
  } 
  else {
    return (
      <div className="App">
        
        {myData && (
          <div align={'center'} justify={'center'} className={'row-2'}>
              <div className={'weather-result'}>
                <h3>{myData.name.toUpperCase()}</h3>
                <p>Temperature: {myData.main.temp} degC</p>
                <p>Feels like: {myData.main.feels_like} degC</p>
                <p>Humidity: {myData.main.humidity} %</p>
                <div className='weather-icon-container'>
                  <img className={'weather-icon'} src={`http://openweathermap.org/img/wn/${myData.weather[0].icon}.png`}></img>
                </div>
                <p>{myData.weather[0].main +': '+ myData.weather[0].description} </p>
              </div>
          </div>
        )}


      </div>
    );
  }
};

export default App;