import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchField = createAsyncThunk("fetchField",
    async () => {
        const {data} = await axios.get("http://194.58.119.86:8080/level/1");
        console.log(data)
        return data
    })
    
let field = []
for (let i = 0; i < 30; i++) {
    field.push([])
    for (let j = 0; j < 30; j++) {
        field[i].push(0)
    }
}

const initialState = {
    field: field,
    coords: {x: 3, y: 2},
    cops: [{x: 19, y: 21, copDir: 4},
           {x: 20, y: 21, copDir: 4},
           {x: 21, y: 21, copDir: 4},
           {x: 22, y: 21, copDir: 4}],
    background: ""
}

const fieldSlice = createSlice({
    name: "field",
    initialState: initialState,
    reducers: {
        setField: (state, action) => {
            state.field = action.payload.field
            state.coords = action.payload.coords
        },
        setInitialField: (state) => {
            return initialState
        },
        setToolToField: (state, action) => {
            state.field[action.payload.y][action.payload.x] = action.payload.toolInd
        },
        setCopsMoves: (state, action) => {
            for (let i = 0; i < state.cops.length; i++) {
                state.field[state.cops[i].y][state.cops[i].x] = 0
            }
            state.cops = action.payload
            for (let i = 0; i < action.payload.length; i++) {
                state.field[action.payload[i].y][action.payload[i].x] = 8
            }
        }
    },
    extraReducers: {
        [fetchField.fulfilled]: (state, action) => {
            state.field = action.payload.field
            state.background = action.payload.url
            console.log(state.background)
        }
    }
})

export const selectCops = (state) => state.field.cops
export const selectField = (state) => state.field
export const selectBackgroundField = (state) => state.field.background
export const {setField, setInitialField, setToolToField, setCopsMoves} = fieldSlice.actions
export const fieldReducer = fieldSlice.reducer