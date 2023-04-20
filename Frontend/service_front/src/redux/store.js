import {configureStore} from '@reduxjs/toolkit'
import {usersReducer} from './slices/users'
import {feedsReducer} from "./slices/feeds";
import {userReducer} from './slices/user'
import {userFeedsReducer} from "./slices/userFeeds";
import {securityReducer} from "./slices/security";

export default configureStore({
    reducer: {
        users: usersReducer,
        user: userReducer,
        user_feeds: userFeedsReducer,
        feeds: feedsReducer,
        security: securityReducer
    }
});