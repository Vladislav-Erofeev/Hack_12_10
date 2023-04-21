import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    field: [[1,2,0,0,0],
            [0,2,0,0,0],
            [0,2,2,0,2],
            [0,2,0,0,2],
            [0,0,0,2,2]],
    coords: {x: 0, y: 0}
}

const fieldSlice = createSlice({
    name: "field",
    initialState: initialState,
    reducers: {
        setField: (state, action) => {
            state.field = action.payload.field
            state.coords = action.payload.coords
        },
        setInitial: (state) => {
            return initialState
        }
    }
})

export const selectField = (state) => state.field
export const {setField, setInitial} = fieldSlice.actions
export const fieldReducer = fieldSlice.reducer