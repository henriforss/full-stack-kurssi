import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

/* Funktio filtteröinti-lomakkeen näyttämiseen. */
const FindForm = (props) => {
  return (
    <form> Find countries:<input 
        value={props.findvalue}
        onChange={props.findvaluechange} />
    </form>
  )
}

/* Jos maita on korkeintaan kymmenen, näytä lista maista plus nappi,
jota klikkaamalla pääse kyseisen maan tietoihin. */
const ShowCountry = (props) => {
  console.log(props)
  console.log(props.country)
  console.log(props.setCountries)

  return (
    <div>
      {props.country.name}<button onClick={() => props.setCountries[props.country]}>Show</button>
    </div>
  )
}

/* Näyttää valitun maan kielet. */
const ShowLanguage = (props) => {
  return (
    <div>
      <li>{props.language}</li>
    </div>
  )
}

/* Näyttää valitun maan tiedot. */
const ShowDetails = (props) => {
  const country = props.country
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        <div>
          {country.languages.map(language =>
            <ShowLanguage
              key={language.name}
              language={language.name}
            />
          )}
        </div>
      </ul>
      <div>
        <img src={country.flags.png} width="150"/>
      </div>
    </div>
  )
}

/* Funktio valittujen maiden näyttämiseen. Jos maita on yli 10,
mitään ei näytetä. Jos maita on 2-10 näytetään maat. Jos maita on
vain 1, näytetään kyseisen maan tiedot.  */
const ShowFilteredCountries = (props) => {
  if (props.countries.length > 10) {
    return (
      <div>
          Start typing to filter countries
      </div>
      )
  } else if (props.countries.length > 1) {
    return (
      <div>
        {props.countries.map(country =>
          <ShowCountry
            key={country.name}
            country={country}
            setCountries={props.setCountries}
          />
        )}
      </div>
    )
  } else if (props.countries.length === 1) {
    const selected = props.countries[0]
    return (
      <div>
        <ShowDetails
          country={selected}
        />
      </div>
    )
  } else {
    return (
      <div>
        No such country
      </div>
    )
  }
}

/* Itse appi. */
function App() {

  /* Määritellään muuttujia ja listoja useStaten avulla. */
  const [countries, setCountries] = useState([])
  const [findWith, setFindWith] = useState("")

  /* Haetaan tiedot axios:in avulla ja tallennetaan ne muuttujaan. */
  const hook = () => {
    axios
    .get("https://restcountries.com/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  }

  /* Kutsutaan hook:ia useEffectin avulla komponentin käynnistyessä. */
  useEffect(hook, [])

  /* Filtteröintilomakkeen tapahtumankäsittelijä. Seurataan mitä 
  input-kentässä tapahtuu ja päivitetään findWith:in arvoa. */
  const handleFindWith = (event) => {
    setFindWith(event.target.value)
  }

  /* Filtteröi countries-listaa findWith:illä. */
  const findCountries = countries.filter(country => 
    (country.name).toLowerCase().includes(findWith))

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <FindForm
          findvalue = {findWith}
          findvaluechange = {handleFindWith}
        />
      </div>
      <div>
        <ShowFilteredCountries
          countries={findCountries}
          setCountries={setCountries}
        />
      </div>
    </div>
  )
}


export default App
