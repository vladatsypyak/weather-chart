import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";


function Chart() {
    const city = useSelector(store => store.weatherSlice.city)



    return (
        <div className="chart_wrap">

        </div>
    );
}

export default Chart;
