import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "../../redux/slice";
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";


function Chart() {
    const city = useSelector(store => store.weatherSlice.city)
    const forecast = useSelector(store => store.weatherSlice.weather)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getWeather(city))
    }, [dispatch, city])


    return (
        <div className="chart_wrap">
            {city ? <BarChart width={730} height={250} data={forecast} margin={{top: 20, right: 20, bottom: 20, left: 20}} >
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="data" fill="#8884d8" />
            </BarChart> :
                <p>Please enter a city to see the forecast</p>}

        </div>
    );
}

export default Chart;
