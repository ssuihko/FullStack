import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/personService'

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
  const [ failed, setFailed] = useState(false)

  const Notification = ( { message, failed } ) => {
    if(message === null) {
      return null
    }
    if(!failed) {
    return (
      <div className="alert">
        {message}
      </div>
    )
    } else {
      return (
        <div className="alert2">
        {message}
      </div>
      )
    }
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
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService.update(itemId, {name: newName, number: newNumber}).then(updateDB).catch(e => {
            setFailed(true)
            setAlertMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setAlertMessage(null)}, 2000)
          })
          setFailed(false)
          setAlertMessage(`${newName} updated!`)
          setTimeout(() => {
            setAlertMessage(null)}, 2000)
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
    setFailed(false)
    setAlertMessage(`${newName} added!`)
    setTimeout(() => {
      setAlertMessage(null)}, 2000)
    
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

  function deleteFromDB(props)  {
    if (window.confirm('Delete ' + props.name + '?')) {
      personService.del(props.id, updateDB)
      setFailed(false)
      setAlertMessage(`${props.name} deleted!`)
      setTimeout(() => {
      setAlertMessage(null)}, 2000)
  }
}

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={alertMessage} failed={failed}/>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {persons.map((person, i) => {
      if(person.name.toLowerCase().includes(filter.toLowerCase())) {
        return (
          <div key={i}>
      <Person key={person.name} name={person.name} number={person.number} /> 
      <p><button key={i} type="button" onClick={() =>  deleteFromDB(person)}>delete</button></p>
      </div>
        )
      } else {
        return ("")

        }
      })}
    </div>
  )

}

export default App