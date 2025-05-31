import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const fetchCities = async (city) => await axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
    .then(resp => resp.data)
    .catch(error => console.log(error))

export const getFirstCity = createAsyncThunk('city/getCity',
    async (city, thunkAPI) => {
        try {
           const data =  await fetchCities(city)
            if(Array.isArray(data) && data.length > 0){
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
                return thunkAPI.rejectWithValue('Error when fetching city');
            }
        }
    })

const initialState = {
    city: null,
    loading: false,
    error: null,
}


export const weatherSlice = createSlice({
    name: 'weatherSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFirstCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFirstCity.fulfilled, (state, action) => {
                state.city = action.payload
                state.loading = false;
                state.error = null;
            })
            .addCase(getFirstCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch city';
            })
    }
})


export const {} = weatherSlice.actions

export default weatherSlice.reducer
