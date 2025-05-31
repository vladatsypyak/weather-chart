import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from "./slice";

export const store = configureStore({
    reducer: {
        weatherSlice: weatherSlice
    },
})
