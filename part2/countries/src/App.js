import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  var numMatch = 0

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const Filter = ( {filter, handleFilter} ) => (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
    </div>
  )

  const Countries = ( {countries, filter} ) => (
        
    countries.map((country, i) => {

        numMatch = countries.reduce(function(n, country) {
        return n + (country.name.toLowerCase().includes(filter.toLowerCase()));}, 0);
    

    if(country.name.toLowerCase().includes(filter.toLowerCase()) && numMatch < 11 && numMatch > 0) {
    
    return (
    <p key={i}>{country.name}</p>
    )
} else {
    return ('')
}}
))

  return (
    <div>
      
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
   
  );

}

export default App;
