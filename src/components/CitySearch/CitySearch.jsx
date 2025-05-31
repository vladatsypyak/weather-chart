import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFirstCity} from "../../redux/slice";

function CitySearch() {
    const city = useSelector(store => store.weatherSlice.city)
    const [cityInput, setCityInput] = useState("")
    const dispatch = useDispatch()

    const onSearchClick = async () => {
        if (!cityInput) return
        await dispatch(getFirstCity(cityInput))
        if (!city) {
          window.alert("Sorry, no city was found")
        }
    }


    return (
        <div className="CitySearch">
            <input type="text" onInput={(e) => setCityInput(e.target.value)}/>
            <button onClick={onSearchClick}> search</button>
        </div>
    );
}

export default CitySearch;
