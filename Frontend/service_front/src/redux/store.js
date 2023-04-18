import {configureStore} from '@reduxjs/toolkit'
import {usersReducer} from './slices/users'
import {feedsReducer} from "./slices/feeds";
import {authReducer} from "./slices/auth";

export default configureStore({
    reducer: {
        users: usersReducer,
        feeds: feedsReducer,
        auth: authReducer
    }
});