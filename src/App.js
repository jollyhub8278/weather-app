import React, {useState} from 'react'
import axios  from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=f5ee36e101490961951f0d2011fb3cd5`
  
  const searchLocation = (event) => {

    if(event.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
      setLocation('');
    }
  }

  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }
  
  return (
    <div className="App">
    <div className="container1">
      <div className="search">
        <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown = {searchLocation}
        placeholder = "Enter Location"
        type="text"
        />
      </div>
    </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main? <h1>{fahrenheitToCelsius(data.main.temp).toFixed(2)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p>: null}
          </div>
        </div>


       {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main? <p>{fahrenheitToCelsius(data.main.feels_like).toFixed(2)}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main? <p>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed}MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
