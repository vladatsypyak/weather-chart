import {useSelector} from "react-redux";
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";
import s from "./chart.module.scss"


function Chart() {
    const forecast = useSelector(store => store.weatherSlice.weather)
    return (
        <div className={s.chart_wrap}>
          <BarChart layout={'vertical'} width={900} height={400} data={forecast}
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
                </BarChart>
        </div>
    );
}

export default Chart;
