
// images
import searchIcon from "./assets/search.png";
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rain.png"
import windicon from "./assets/wind.jpg";
import snow from "./assets/snow.png";
import humidityicon from "./assets/humidity.png"

//import PropTypes from "prop-types";
import "./App.css"
import { useEffect, useState } from "react";


const WeatherDetails=({icon,temp,city,country,
  lat,log,humidity,wind})=>{
  return (
    <>
    <div className="image">
    <img src={icon}  alt="Image"/>
    </div>

    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
       <div>
        <span className="log">longitude</span>
        <span>{log}</span>
      </div>
    </div>

    <div className="data-container">
      <div className="element">
       <img src={humidityicon} width={50} height={50} alt="humidity image" className="icon"/>
       <div className="data">
        <div className="humidity-percent">{humidity}%</div>
         <div className="text">Humidity</div>
       </div>
      </div>

      <div className="element">
       <img src={windicon} width={50} height={50} alt="wind image" className="icon"/>
       <div className="data">
        <div className="wind-percent">{wind} km</div>
         <div className="text">Wind</div>
       </div>
       
      </div>
      
    </div>
    
    </>
  )
}



// WeatherDetails.propTypes={
//   icon:PropTypes.String.isRequired,
//   temp:PropTypes.number.isRequired,
//   city:PropTypes.String.isRequired,
//   country:PropTypes.String.isRequired,
//   humidity:PropTypes.number.isRequired,
//   wind:PropTypes.number.isRequired,
//   lat:PropTypes.number.isRequired,
//   log:PropTypes.number.isRequired,
// }
function App() {
  const [icon,setIcon]=useState(snow)
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState("")
  const [country,setCountry]=useState("")
  const [lat,setLat]=useState(0)
  const [log,setLog]=useState(0)
  const [humidity,setHumidity]=useState(0)
  const [wind,setWind]=useState(0)
  const [cityNotFound,setCityNotFound]=useState(false)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
let api_key="a863146af0daf4ccc1a68f36b18856fb"
const [text,setText]=useState("chennai")
const weatherIconMap={
  "01d":clear,
  "01n":clear,
  "02d":cloud,
  "02n":cloud,
  "03d":drizzle,
  "03n":drizzle,
  "04d":drizzle,
  "04n":drizzle,
  "09d":rain,
  "09n":rain,
  "10d":rain,
  "10n":rain,
  "13d":snow,
  "13n":snow,
}


  const search=async()=>{
  
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
  try {
  let res=await fetch(url)
  let data=await res.json()
//console.log(data)

if(data.cod === "404"){
  console.error("city not found")
  setCityNotFound(true)
  setLoading(false)
  return
}

setHumidity(data.main.humidity)
setWind(data.wind.speed)
setTemp(Math.floor(data.main.temp))
setCity(data.name)
setCountry(data.sys.country)
setLat(data.coord.lat)
setLog(data.coord.lon)
const weatherIconCode=data.weather[0].icon;
setIcon(weatherIconMap[weatherIconCode] || clear)
setCityNotFound(false)

} catch (e) {
  console.error("error occured:",e.message)
  setError("An error occured while fetching weather data.")
}finally{
setLoading(false)
}
}



const handleCity=(e)=>{
setText(e.target.value)
}

const handleKeyDown=(e)=>{
if(e.Key === "Enter"){
  search()
}
}

useEffect(function(){
  search()
},[])
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput" placeholder="Search City"
          value={text} onChange={handleCity}
          onKeyDown={handleKeyDown}/>


           <div className="search-icon">
            <img src={searchIcon} height={30} width={30}
            onClick={search} alt="Search Icon"/>
           </div>
        
        </div>
       

       {loading && <div className="loading-message">
          Loading...
        </div>}

        {error && <div className="error-message">
          {error}
        </div>}

         {cityNotFound && <div className="city-not-found">
          City not found
        </div>}

         { !loading && !cityNotFound && <WeatherDetails icon={icon}  
        temp={temp} city={city} country={country} lat={lat} log={log}
        humidity={humidity} wind={wind}/>}
        <p className="copyright">
        Designed by Agalya <span>Software Developer</span>
      </p>
      </div>
    </>
  )
}

export default App
