import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    city: null,
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
    },
})

export const { } = appSlice.actions

export default appSlice.reducer
