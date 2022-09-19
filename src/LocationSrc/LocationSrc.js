import { useState } from "react"
import { apiKey } from '../constants'
import "../App/style.css"
 
export const LocationSrc = ({onCityFound}) =>{

    const [city, setCity] = useState('')



    const getLocation = (c) =>{
        const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${c}`
        fetch(url)
            .then(res => res.json())
            .then(res => res[0])
            .then(res => {onCityFound({
                name: res.LocalizedName,
                key: res.Key,
                country: res.Country.ID
            })
            setCity('')    
        })
    }
    return(
        <div className="search">
            <input 
                placeholder="City..."
                value={city}
                onChange={event=>setCity(event.target.value)}
                />
            <button 
                onClick={() => getLocation(city)}
                >Search</button>
        </div>
    )
}

