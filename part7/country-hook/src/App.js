import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}


const useCountry = name => {

  const [country, setCountry] = useState(null)

  const maa = []

  useEffect(() => {

    axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`).then((res) => { 
        
        maa.data = res.data[0]
     //  console.log('maa kirjoitettu: ' , res.data[0])
      //  console.log('maa datasta: ', res.data[0].name)
       if(!(maa.data.name === res.data[0].name)) {
      //   console.log('taalla')
          maa.found = false
          setCountry(maa)
        } else {

        maa.found = true
        setCountry(maa)
      }}
    
      )
        .catch(e => {
          setCountry(maa)
      }
      )
     
    }, [name, maa])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)


  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App