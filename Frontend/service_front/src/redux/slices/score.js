import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    score: 1000,
    time: 0
}

const gameScoreSlice = createSlice({
    name: "game_status",
    initialState: initialState,
    reducers: {
        setScore: (state, action) => {
            state.time = action.payload.time
            if (action.payload.time < 60) state.score = 1000
            else if (action.payload.time < 45) state.score = 600           
            else if (action.payload.time < 30) state.score = 200
            else if (action.payload.time < 15) state.score = 0
        }
    }
})

export const selectScore = (state) => state.game_score
export const {setScore} = gameScoreSlice.actions
export const gameScoreReducer = gameScoreSlice.reducer