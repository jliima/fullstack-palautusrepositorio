import React, { useState, useEffect } from 'react'
import axios from 'axios'

const APIKEY = process.env.REACT_APP_API_KEY

const SearchForm = ({searchKey, setSearchKey, handleSearchKeyChange}) => (
    <form onSubmit={setSearchKey}>
      <div>find contries
        <input
          value={searchKey}
          onChange={handleSearchKeyChange}
          />
      </div>
    </form>
)
const Weather = ({capital}) => {

  const [weather, setWeather] = useState({
    temperature: null,
    weather_icons: null,
    windSpeed: null,
    windDirection: null
  })

  useEffect(() => {
    const params = {
      access_key: APIKEY,
      query: {capital}
    }
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const newWeather = {}
        newWeather['temperature'] = response.data.current.temperature
        newWeather['icon'] = response.data.current.weather_icons
        newWeather['windSpeed'] = response.data.current.wind_speed
        newWeather['windDirection'] = response.data.current.wind_dir
        setWeather(newWeather)
      }).catch(error => {
        console.log('error getting weather information')
      })
  }, [capital])

  if (weather['temperature'] === null) return <div>weather information unavailable</div>

  return (
    <div>
      <h2>Weather in {capital}</h2>

      <div>
        <b>temperature:</b> {weather.temperature} Celcius
      </div>

      <div>
        <img src={weather.icon} alt='' />
      </div>

      <div>
        <b>wind:</b> {weather.windSpeed} km/h direction {weather.windDirection}
      </div>

    </div>
  )
}

const Contry = ({contry}) => (
  <div>
    <h2>{contry.name}</h2>
    <div>capital {contry.capital}</div>
    <div>population {contry.population}</div>
    <h3>languages</h3>

    {contry.languages.map((language, i) =>
      <li key={i}>
        {language.name}
      </li>
    )}

    <img src={contry.flag} width="100" alt='' />
    <Weather capital={contry.capital} />

  </div>
)

const Contries = ({filteredContries}) => {
  const [clickedContry, setClickedContry] = useState({})

  if (Object.keys(clickedContry).length !== 0) return <Contry contry={clickedContry} />

  return (
  <div>
    {filteredContries.map((contry, i) =>
      <div key={i}>
        {contry.name}
        <button onClick={() => setClickedContry(contry)}>show</button>
      </div>
    )}
  </div>
  )
}

const FilterContries = ({contries, searchKey}) => {
  
  if (contries.length === 0) return <></> 
  else if (searchKey === '') return <></>

  const filteredContries = contries.filter(value => value.name.toLowerCase().includes(searchKey.toLowerCase()))
  
  if (filteredContries.length > 10)       return <div>Too many matches, specify another filter</div>
  else if (filteredContries.length > 1)   return <Contries filteredContries={filteredContries} />
  else if (filteredContries.length === 1) return <Contry contry={filteredContries[0]} />
  else                                    return <></>

}

const App = () => {
  const [contries, setContries] = useState([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setContries(response.data)
        
      })
  }, [])

  const handleSearchKeyChange = (event) => {
    setSearchKey(event.target.value)
  }

  return (
    <div>
      <SearchForm searchKey={searchKey} setSearchKey={setSearchKey} 
                  handleSearchKeyChange={handleSearchKeyChange}/>
      <FilterContries contries={contries} searchKey={searchKey} />
    </div>
  )
}

export default App 