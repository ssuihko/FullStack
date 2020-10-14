import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App () {

  const [ countries, setCountries] = useState([])
  const [ filtering, setFilter ] = useState(true)
  const [ filteredCountries, setFilteredCountries ] = useState('')
  const [ weather, setWeather ] = useState([])
  const [ location, setLocation ] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const numMatch = countries.filter(c => c.name.toLowerCase().includes(filteredCountries.toLowerCase())).length

  var countriesShow = filtering
  ? countries
  : countries.filter(c => c.name.toLowerCase().includes(filteredCountries.toLowerCase()))


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])


function WeatherQuery(country ) {

  const params = {
    access_key: api_key,
    query: country.capital
 }
 
 axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
        if (!response.data.error) {
            const apiResponse = response.data;
            setWeather(apiResponse.current)
            setLocation(apiResponse.location)
        } else {
            console.log(`Response error: code: ${response.data.error.code}, info: ${response.data.error.info}`)
        }
    }).catch(error => {
        console.error("An error occurred: ", error);
    }
    
 );

}
 
const Filter = ( {filter, handleFilter} ) => {
    return (
      <form>
    <div>
      find countries <input value={filter} onChange={handleFilter} />
    </div>
    </form>
    )
  }

  const handleFilter = (event) => {
    setFilteredCountries(event.target.value)
    if(event.target.value === '') {
      setFilter(true)
    } else {
      setFilter(false)
    }
  } 

  const Country = ( { country } ) => {

    console.log(country.capital, ' is the country')
    console.log(location.name, ' is the location')
    if(weather.length === 0 || (location.name !== country.capital && location.country !== null)  ) {
      WeatherQuery(country)
    }

    return (
      <div>
           <h2>{country.name} </h2>
              <p> capital {country.capital }</p>
              <p> population {country.population}</p>
            <h3>Languages</h3>
            <ul>
              { country.languages.map( c => 
                <li key={c.name}>{c.name}</li>
              )}
            </ul>

            <img src={country.flag} alt="flag" style={{ width: "200px", height:"150px" }}></img>
            <p>Weather in {country.capital}</p>
             <p>Temperature : { weather.temperature } Celcius</p>
            <img src={ weather.weather_icons } alt="wicon" style={{ width: "200px", height:"150px" }}></img>
              <p>Wind : { weather.wind_speed } mph direction {weather.wind_dir} </p>
      </div>      
    )
  }


  const Show = ( {country, amount } ) => {

    if(amount >= 11 && numMatch !== 250) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
  
    if( amount < 11 && amount > 0 && amount !== 1 ) {

    return ( 
      country.map(country => 
      <div key={country.name}>{country.name}
      <button key={country.name} onClick={() => { setFilteredCountries(country.name) ; WeatherQuery(country) } }>Show</button>
      </div>
        ) 
    )

    } else if(amount === 1) {
     return (
       <Country country={country[0]}></Country>
     )
        
     } else {
        return ('')
     }
  }

      
    return (
      <div>
        <Filter filter={filteredCountries} handleFilter={handleFilter} />
        <Show country={countriesShow} amount={numMatch} />
      </div>
    )
  }

export default App;

