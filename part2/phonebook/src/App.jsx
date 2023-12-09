import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (persons.map(p => p.name).includes(newName)){
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons([
        ...persons,
        {id: persons.length + 1, name: newName, number: newNumber}
      ]);
      setNewName("")
      setNewNumber("")
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} changeFilter={setFilter} />

      <h2>Add a new Contact</h2>
      <PersonForm submit={handleAddPerson} newName={newName} changeName={setNewName} newNumber={newNumber} changeNumber={setNewNumber} />
      
      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} />
      
    </div>
  )
}

export default App