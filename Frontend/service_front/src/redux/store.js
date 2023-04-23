import {configureStore} from '@reduxjs/toolkit'
import {usersReducer} from './slices/users'
import {feedsReducer} from "./slices/feeds";
import {authReducer} from "./slices/auth";
import {fieldReducer} from "./slices/gameField";
import {gameStatusReducer} from "./slices/gameStatus";
import { gameToolsReducer } from './slices/tools';
import { gameScoreReducer } from './slices/score';

export default configureStore({
    reducer: {
        users: usersReducer,
        feeds: feedsReducer,
        auth: authReducer,
        field: fieldReducer,
        game_status: gameStatusReducer,
        game_tools: gameToolsReducer,
        game_score: gameScoreReducer
    }
});