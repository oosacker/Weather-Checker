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
        {myData.data}
      </div>
    );
  }
};

export default App;