import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCities, getFirstCity} from "../../redux/slice";
import s from "./citySearch.module.scss"
import Autocomplete from "./Autocomplete";

function CitySearch() {
    const city = useSelector(store => store.weatherSlice.city)
    const alert = useSelector(store => store.weatherSlice.alert)
    const [cityInput, setCityInput] = useState("")
    const [cities, setCities] = useState([])

    const dispatch = useDispatch()

    useEffect( ()=>{
        if (!cityInput) {
            setCities([])
            return
        }
        const fetchData = async () => {
            let fetchedCities = await fetchCities(cityInput)
            if(Array.isArray(fetchedCities)){
                setCities(fetchedCities)
            }
        }
        fetchData()
    }, [cityInput])

    const onSearchClick = async () => {
        if (!cityInput) return
        await dispatch(getFirstCity(cityInput))
    }

    return (
        <div className={s.search_wrap}>
            <div className={s.input_wrap}>
                <input placeholder={"Type your city"} type="text" onInput={(e) => setCityInput(e.target.value)}/>
                <button onClick={onSearchClick}>Search</button>
            </div>
            <Autocomplete cities={cities} setCities={setCities}/>
            {city && <p className={s.text}>Forecast for {city.name}, {city.country}{city.state && ","} {city.state}</p>}
            {alert && <p className={s.alert}>No city was found 😞 </p>}
        </div>

    );
}

export default CitySearch;
