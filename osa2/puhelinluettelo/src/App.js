import { useState } from 'react'

const FilterForm = (props) => {
  return (
    <form>
      <div>
        filter with: <input value={props.filter} 
        onChange={props.filterchange} />
      </div>

    </form>
  )
}

const AddPersonForm = (props) => {
  return (
    <form onSubmit={props.add}>
      <div>
        name: <input value={props.name} onChange={props.namechange} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.numberchange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ShowPhonebook = (props) => {
  return (
    <div>
      {props.persons.map(person => 
        <ShowNameNumber 
          key={person.name} 
          name={person.name} 
          number={person.number} />
      )} 
    </div>
  )
}

const ShowNameNumber = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: "Johnny Bones", number: "099-1001-1001" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterWith, setFilterWith] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.filter(person => person.name === newName)
    if (found.length === 0) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    } else {
      alert(`${newName} is already in phonebook`)
      setNewName("")
      setNewNumber("")
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterWith = (event) => {
    setFilterWith(event.target.value)
  }
  
  const filterPersons = persons.filter(person => 
    (person.name).toLowerCase().includes(filterWith))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm 
        filter={filterWith} 
        filterchange={handleFilterWith} />
      <h2>add new number</h2>
      <AddPersonForm 
        add={addPerson} 
        name={newName} 
        namechange={handleNameChange}
        number={newNumber}
        numberchange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ShowPhonebook
        persons={filterPersons} />
    </div>
  )
}

export default App