import {configureStore} from '@reduxjs/toolkit'
import {fieldReducer} from "./slices/gameField";
import {gameStatusReducer} from "./slices/gameStatus";
import { gameToolsReducer } from './slices/tools';
import { gameScoreReducer } from './slices/score';
import {securityReducer} from "./slices/security";
import {userReducer} from "./slices/user";

export default configureStore({
    reducer: {
        user: userReducer,
        auth: securityReducer,
        field: fieldReducer,
        game_status: gameStatusReducer,
        game_tools: gameToolsReducer,
        game_score: gameScoreReducer
    }
});