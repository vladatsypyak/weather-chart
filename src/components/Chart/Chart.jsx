import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "../../redux/slice";
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";


function Chart() {
    const city = useSelector(store => store.weatherSlice.city)
    const forecast = useSelector(store => store.weatherSlice.weather)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWeather(city))
    }, [dispatch, city])


    return (
        <div className="chart_wrap">
            {city ? <BarChart layout={'vertical'} width={900} height={400} data={forecast}
                              margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <XAxis type="number" domain={['auto', 'auto']} unit={"°C"}/>
                    <YAxis type="category" dataKey="day"/>
                    <Tooltip formatter={(value) => {
                        if (Array.isArray(value)) {
                            return [`${value[0]} - ${value[1]}`]
                        }
                        return value
                    }
                    }/>
                    <Bar dataKey="temp" fill="#8884d8" unit={"°C"}/>
                </BarChart> :
                <p>Please enter a city to see the forecast</p>}

        </div>
    );
}

export default Chart;
