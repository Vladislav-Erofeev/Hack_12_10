import {configureStore} from '@reduxjs/toolkit'
import {fieldReducer} from "./slices/gameField";
import {gameStatusReducer} from "./slices/gameStatus";
import {securityReducer} from "./slices/security";
import {userReducer} from "./slices/user";

export default configureStore({
    reducer: {
        user: userReducer,
        auth: securityReducer,
        field: fieldReducer,
        game_status: gameStatusReducer
    }
});