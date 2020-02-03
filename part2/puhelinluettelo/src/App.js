import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/personss'

const App = () => {
  const [ persons, setPersons] = useState([]) 

  useEffect(() => {   
    personService
    .getAll()    
    .then(initialPersons => {     
        setPersons(initialPersons) 
           })
       }, []) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ alertMessage, setAlertMessage] = useState(null)

  const Notification = ( { message } ) => {
    if(message === null) {
      return null
    }

    return (
      <div className="alert">
        {message}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    
    }
    var nimi = ""
    persons.forEach(function(item) {
        if(item.name === newName) {
          var itemId = item.id
          console.log(itemId)
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
         // setPersons([...persons, {name: newName, number: newNumber}]) 
          personService.update(itemId, {name: newName, number: newNumber}).then(updateDB)
          setAlertMessage(`${newName} updated!`)
          setTimeout(() => {
            setAlertMessage(null)}, 5000)
            nimi = item.name
        } else {
          nimi = item.name
        }
     nimi = item.name
    }
  } )

    if(!Boolean(nimi)) {
    personService
    .create(personObject)
    .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')
    })
    setAlertMessage(`${newName} added!`)
    setTimeout(() => {
      setAlertMessage(null)}, 5000)
    
  }
}

  

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const updateDB = () => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  
  }

  const deleteFromDBMessage = ( props ) => {
    setAlertMessage(`${props} deleted!`)
    setTimeout(() => {
      setAlertMessage(null)}, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={alertMessage} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {persons.map((person, i) => {
        { console.log(person) }
      if(person.name.toLowerCase().includes(filter.toLowerCase())) {
        return (
          <>
      <Person key={person.name} name={person.name} number={person.number} /> 
      <p><button key={i + 6} type="button" onClick={() => {personService.del(person.id, person.name, updateDB); deleteFromDBMessage(person.name)}}>delete</button></p>
      </>
        )
      } else {
        return ("")

        }
      })}
    </div>
  )

}


export default App