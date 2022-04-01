import axios from 'axios'
import { useEffect, useState } from 'react'

/* Funktio filtteröinti-lomakkeen näyttämiseen. */
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

/* Funktio henkilön lisäämiseen tarvittavien lomakkeiden
ja napin näyttämiseen. */
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

/* Funktio (filtteröidyn) puhelinluettelon näyttämiseen. */
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

/* Funktio nimen ja numeron näyttämiseen. */
const ShowNameNumber = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

/* Itse appi. */
const App = () => {

  /* Muuttujien ja listojen määrittely Reactin useStaten avulla.
  Event loopin takia näitä ei voi määritellä samalla tapaa kuin Pythonissa.
  Siinä tapauksessa tiedot nollautuisivat jokaisen loopin alussa. */
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterWith, setFilterWith] = useState("")

  /* Määritellään muuttuja jolla haetaan puhelinluettelon tiedot
  palvelimelta axios:in avulla ja asetetaan ne persons-muuttujaan 
  setPersons-funktion (?) avulla. */
  const hook = () => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  }

  /* Kutsutaan useEffectia parametrilla hook ja tyhjällä listalla,
  joka tarkoittaa että efekti suoritetaan vain kerran ohjelman
  käynnistyessä. */
  useEffect(hook, [])

  /* Funktio uuden henkilön lisäämiseen. Estetään default-toiminta,
  tarkastetaan (hieman kömpelösti) jos henkilön nimi löytyy listasta,
  ja jos ei löydy, lisätään tiedot useStatessa määriteltyjen apuvälineiden
  avulla.   */
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
  
  /* Tapahtumankäsittellijä nimen input-kentälle. Tällä pidetään huolta,
  että input kenttään voi kirjoittaa. */
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  /* Tapahtumankäsittelijä. */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  /* Tapahtumankäsittelijä. */
  const handleFilterWith = (event) => {
    setFilterWith(event.target.value)
  }
  
  /* Funktio jonka avulla filtteröidään hebkilöitä. */
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