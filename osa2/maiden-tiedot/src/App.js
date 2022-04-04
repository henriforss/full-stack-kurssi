import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"
import "./index.css"

/* Funktio filtteröinti-lomakkeen näyttämiseen. */
const FindForm = (props) => {
  return (
    <form> Find countries:<input 
        value={props.findvalue}
        onChange={props.findvaluechange} />
    </form>
  )
}

/* Funktio talletta API-avaimen ja URL-osoitteen muuttujiin, 
asettaa searchParams API:n mallin mukaan, hakee tiedot use Staten avulla
ja tulostaa ne näytölle. */
const ShowWeather = (props) => {

  /* Määritellään uusi muuttuja use Staten avulla. */
  const [weather, setWeather] = useState(null)

  /* Otetaan käyttöön API-avain, joka on määritelty npm:n käynnistyksen
  yhteydessä. */
  const api_key = process.env.REACT_APP_API_KEY

  /* Luodaan uusi URL-objekti. */
  const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather")

  /* Lisätään URL-objektiin hakuparametrejä. */
  weatherUrl.searchParams.set("q", `${props.city}`)
  weatherUrl.searchParams.set("appid", `${api_key}`)
  weatherUrl.searchParams.set("units", "metric")

  /* Luodan muuttuja joka hakee säätiedot axios:in avulla. */
  const getWeather = () => {
    axios
    .get(weatherUrl)
    .then(response => {
      setWeather(response.data)
    })
  }

  /* Haetaan säätiedot useEffectin avulla. */
  useEffect(getWeather, [])

  /* Määritellään uusi URL-objekti jonka kautta saadaan sää-ikoni. */
  const weatherIcon = weather?.weather[0].icon
  const iconUrl = new URL(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)

  /* Palautetaan tietoja. */
  return (
    <div>
      <h3>Weather in {props.city}</h3>
      <div>
        Temperature: {weather?.main.temp} Celsius
      </div>
      <div>
        <img src={iconUrl} />
      </div>
      <div>
        Wind: {weather?.wind.speed} m/s
      </div>
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
      <div>Area: {country.area} km²</div>
      <div>Currency: {country.currencies[0]["code"]}</div>
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
      <div className="flagstyle">
        <img src={country.flags.png} width="150"/>
      </div>
      <div>
        <ShowWeather
          city={country.capital} />
      </div>
    </div>
  )
}

/* Jos maita on korkeintaan kymmenen, näytä lista maista plus nappi,
jota klikkaamalla pääse kyseisen maan tietoihin. Tämä ei toimi
täydellisesti, jos haluat uusia haun joudut painamaan enter 
lomakkeessa. */
const ShowCountry = (props) => {
  const handlebutton = () => {
    props.setCountries([props.country])
  }
  return (
    <div>
      {props.country.name}<button onClick={handlebutton}>Show</button>
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
      <div className="detailsstyle">
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
    <div className="appstyle">
      <h1>Countries</h1>
      <div className="formstyle">
        <FindForm
          findvalue = {findWith}
          findvaluechange = {handleFindWith}
        />
      </div>
      <div className="infostyle">
        <ShowFilteredCountries
          countries={findCountries}
          setCountries={setCountries}
        />
      </div>
    </div>
  )
}

export default App
