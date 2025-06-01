import './App.css';
import {useEffect} from "react";
import CitySearch from "./components/CitySearch/CitySearch";
import Chart from "./components/Chart/Chart";
import WeatherPics from "./components/WeatherPics/WeatherPics";
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "./redux/slice";

function App() {
    const city = useSelector(store => store.weatherSlice.city)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWeather(city))
    }, [dispatch, city])

    return (
        <div className="App">
            <CitySearch/>
            {city ? <Chart/> : <WeatherPics/>}
        </div>
    );
}

export default App;
