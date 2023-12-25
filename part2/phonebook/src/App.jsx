import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from'./services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState({message: '', error: false})

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (persons.map(p => p.name).includes(newName)){
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old Number?`)) {
        const updatePerson = {
          ...persons.find(p => p.name == newName),
          number: newNumber
        }
        personService
          .update(updatePerson.id, updatePerson)
          .then(response => {
            setPersons(
              persons.map(p => {
                return (
                  p.id === updatePerson.id 
                    ? updatePerson
                    : p
                )
              })
            )
            setInfo({ message: `Contact ${updatePerson.name} updated`, error: false})
            setTimeout(() => {
              setInfo({message: '', error: false})
            }, 5000)
            setNewName("")
            setNewNumber("")
          })
          .catch((e) => {
            setInfo({ message: e.response.data.error, error: true})
            setTimeout(() => {
              setInfo({message: '', error: false})
            }, 5000)
          })
      }
    } else {
      const newPerson = {id: persons.length + 1, name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(response => {
          setPersons([
            ...persons,
            {id: response.data.id, name: response.data.name, number: response.data.number}
          ])
          setInfo({ message: `Contact ${newPerson.name} added`, error: false})
          setTimeout(() => {
            setInfo({message: '', error: false})
          }, 5000)
        })
        .catch((e) => {
          setInfo({ message: e.response.data.error, error: true})
          setTimeout(() => {
            setInfo({message: '', error: false})
          }, 5000)
        })

        setNewName("")
        setNewNumber("")
    }
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then( response => {
          setPersons(
            persons.filter(person => person.id !== id)
          )
          setInfo({ message: `Contact ${person.name} removed`, error: false})
          setTimeout(() => {
            setInfo({message: '', error: false})
          }, 5000)
        })
        .catch((e) => {
          setInfo({ message: `Unable to delete ${person.name}`, error: true})
          setTimeout(() => {
            setInfo({message: '', error: false})
          }, 5000)
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      {info.message !== "" ?
        info.error ? <div className="infoBox neg"><span>{info.message}</span></div>
                   : <div className="infoBox pos"><span>{info.message}</span></div>
        : ""
      }

      <Filter filter={filter} changeFilter={setFilter} />

      <h2>Add a new Contact</h2>
      <PersonForm submit={handleAddPerson} newName={newName} changeName={setNewName} newNumber={newNumber} changeNumber={setNewNumber} />
      
      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
      
    </div>
  )
}

export default App