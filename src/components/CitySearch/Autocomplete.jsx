import React, {} from "react";
import PropTypes from "prop-types";
import s from "./citySearch.module.scss"
import {setCity} from "../../redux/slice";
import {useDispatch} from "react-redux";

function Autocomplete({cities, setCities}) {
    const dispatch = useDispatch()
    return (
        <div className={s.autocomplete_wrap}>
            {cities.map((city, i) => {
                return <p onClick={() => {
                    dispatch(setCity(city))
                    setCities([])
                }} key={i}>{city.name}, {city.country}{city.state && ","} {city.state}</p>
            })}
        </div>


    );
}
Autocomplete.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            state: PropTypes.string
        })
    ).isRequired,
    setCities: PropTypes.func.isRequired
};


export default Autocomplete;
