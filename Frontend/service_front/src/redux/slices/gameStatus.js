import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameOver: false
}

const gameStatusSlice = createSlice({
    name: "game_status",
    initialState: initialState,
    reducers: {
        setGameOver: (state, action) => {
            state.gameOver = action.payload
        }
    }
})

export const selectGameStatus = (state) => state.game_status.gameOver
export const {setGameOver} = gameStatusSlice.actions
export const gameStatusReducer = gameStatusSlice.reducer