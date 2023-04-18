import {configureStore} from '@reduxjs/toolkit'
import {usersReducer} from './slices/users'
import {feedsReducer} from "./slices/feeds";

export default configureStore({
    reducer: {
        users: usersReducer,
        feeds: feedsReducer
    }
});