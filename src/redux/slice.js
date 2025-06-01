import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import moment from "moment";


export const fetchCities = async (city) => await axios
    // eslint-disable-next-line no-undef
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
    .then(resp => resp.data)
    .catch(error => console.log(error))

const fetchWeather = async (city) => {
    // eslint-disable-next-line no-undef
    return await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(resp => resp.data)
        .catch(error => console.log(error))
}

export const getFirstCity = createAsyncThunk("city/getCity",
    async (city, thunkAPI) => {
        try {
            const data = await fetchCities(city)
            if (Array.isArray(data) && data.length > 0) {
                return {
                    name: data[0].name,
                    lon: data[0].lon,
                    lat: data[0].lat,
                    country: data[0].country,
                    state: data[0].state
                }
            }
            return null
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue("Error when fetching city");
            }
        }
    })

const getForecastForEachDay = (dates, details) => {
    return dates.map((day) => {
        const allTemperatures = details.filter(el => el.day === day).map(el => el.temp).flat()
        return {day, temp: [Math.min(...allTemperatures), Math.max(...allTemperatures)]}
    })
}

export const getWeather = createAsyncThunk("weather/getWeather",
    async (city, thunkAPI) => {
        try {
            if (!city) return null
            const data = await fetchWeather(city)
            const details = data.list.map(el => {
                return {
                    temp: [el.main.temp_max, el.main.temp_min],
                    day: (moment(new Date(el.dt * 1000)).format("ddd, DD.MM"))
                }
            })
            const dates = [...new Set(details.map(el => el.day))]
            return getForecastForEachDay(dates, details)

        } catch
            (error) {
            console.error(error)
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue("Error when fetching weather");
            }
        }
    }
)

const initialState = {
    city: null,
    weather: null,
    loading: false,
    error: null,
    alert: false
}


export const weatherSlice = createSlice({
    name: "weatherSlice",
    initialState,
    reducers: {
        setCity(state, action){
            state.city = {
                name:action.payload.name,
                lon: action.payload.lon,
                lat: action.payload.lat,
                country: action.payload.country,
                state: action.payload.state
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFirstCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFirstCity.fulfilled, (state, action) => {
                state.alert = !action.payload;
                state.city = action.payload
                state.loading = false;
                state.error = null;
            })
            .addCase(getFirstCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch city";
            })
            .addCase(getWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWeather.fulfilled, (state, action) => {
                state.weather = action.payload
                state.loading = false;
                state.error = null;
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch city";
            })
    }
})
export const {setCity} = weatherSlice.actions

export default weatherSlice.reducer
