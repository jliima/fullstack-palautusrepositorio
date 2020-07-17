import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({filter, setFilter, handleFilterChange}) => {
  return (
    <form onSubmit={setFilter}>
      <div>filter shown with
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </form>
  )
}


const PersonForm = ({newName, newNumber, addPerson, 
                    handleSetNameChange, handleSetNumberChange}) => (
  <form onSubmit={addPerson}>
    <div>name:
      <input
        value={newName}
        onChange={handleSetNameChange}
      />
    </div>

    <div>number:
      <input
        value={newNumber}
        onChange={handleSetNumberChange}
      />
    </div>

    <div>
      <button type='submit'>add</button>
    </div>

  </form>
)


const Persons = ({persons, filter}) => {
  const renderPersons = (persons) => (
    <>
      {persons.map((person, i) => 
        <div key={i}>
          {person.name} {person.number}
        </div>
      )}
    </>
  )
  
  if (filter === '') {
    return renderPersons(persons)
  }

  const filteredPersons = []

  persons.forEach((person) => {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
      filteredPersons.push(person)
    }
  })

  return renderPersons(filteredPersons)
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personExists = () => {
    const pos = persons.map(person => person.name).indexOf(newName)
    if (pos === -1){
      return false
    } else {
      return true
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (!personExists()) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }

  }

  const handleSetNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSetNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} 
                               handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} 
                  addPerson={addPerson} handleSetNameChange={handleSetNameChange} 
                  handleSetNumberChange={handleSetNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />

    </div>
  )
}


export default App