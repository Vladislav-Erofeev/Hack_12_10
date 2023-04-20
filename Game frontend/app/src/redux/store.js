import {configureStore} from '@reduxjs/toolkit'
import { fieldReducer } from './slices/gameField'
import { gameStatusReducer } from './slices/gameStatus'
export default configureStore({
    reducer: {
        field: fieldReducer,
        game_status: gameStatusReducer
    }
})