import React from 'react';
import s from "./weatherPics.module.scss"
import sun from "../../assets/sun.png"
import cloudy from "../../assets/cloudy.png"
import temperature from "../../assets/temperature.png"


function WeatherPics() {

    return <div className={s.icons}>
        <div className={s.icon}>
            <img src={sun} alt=""/>
        </div>
        <div className={s.icon}>
            <img src={cloudy} alt=""/>
        </div>
        <div className={s.icon}>
            <img src={temperature} alt=""/>
        </div>
    </div>
}

export default WeatherPics;
