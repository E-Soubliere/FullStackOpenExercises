import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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