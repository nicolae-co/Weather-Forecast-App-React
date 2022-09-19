import { useEffect, useState } from "react";
import { WeatherDay } from "../WeatherDay/WeatherDay";
import '../App/style.css'
import {apiKey} from '../constants'
import {LocationSrc} from "../LocationSrc/LocationSrc";



function App() {

  

  const [locationKey, setLocationKey] = useState()

  const [weatherInfo, setWeatherInfo] =useState()

  const [location, setLocation] = useState('')

  const padNum = (num) =>{
    const stringNum = num+''
    const stringLen = stringNum.length

    if (stringLen === 1){
      return '0'+stringNum
    }else{
      return stringNum
    }
  }


  useEffect(()=>{
    console.log(locationKey);
    if(locationKey){
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}_PC?apikey=${apiKey}`
        )
        .then(res => res.json())
        .then(res => setWeatherInfo(res.DailyForecasts.map(df =>{
          return {
            min: df.Temperature.Minimum.Value,
            max: df.Temperature.Maximum.Value,
            weatherType: df.Day.IconPhrase,
            weatherKey: padNum(df.Day.Icon)

          }
        })))
    }
  }, [locationKey])

  useEffect(()=>{
    console.log(weatherInfo);
  },[weatherInfo])

  return (
    <div>
      <LocationSrc onCityFound={cityInfo => {
        setLocationKey(cityInfo.key)
        setLocation(cityInfo.name+', '+cityInfo.country)
      }} />
      <h1>{location} </h1>
      <div className='main'>
        
      {!!weatherInfo && weatherInfo.map((i,index)=>(
        <div className="day" key={index}>
          <WeatherDay 
            min={i.min} 
            max={i.max} 
            weatherType={i.weatherType} 
            weatherKey={i.weatherKey} />
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
