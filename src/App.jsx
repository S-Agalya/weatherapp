
// images
import search from "./assets/search.png";
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rain.png"
import windicon from "./assets/wind.jpg";
import snow from "./assets/snow.png";
import humidityicon from "./assets/humidity.png"

import "./App.css"
import { useState } from "react";


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

function App() {
  const [icon,setIcon]=useState(snow)
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState("Chennai")
  const [country,setCountry]=useState("India")
  const [lat,setLat]=useState(0)
  const [log,setLog]=useState(0)
  const [humidity,setHumidity]=useState(0)
  const [wind,setWind]=useState(0)
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput" placeholder="Search City"/>


           <div className="search-icon">
            <img src={search} height={30} width={30} alt="Search Icon"/>
           </div>
        
        </div>
        <WeatherDetails icon={icon}  
        temp={temp} city={city} country={country} lat={lat} log={log}
        humidity={humidity} wind={wind}/>
        <p className="copyright">
        Designed by Agalya <span>Software Developer</span>
      </p>
      </div>
    </>
  )
}

export default App
