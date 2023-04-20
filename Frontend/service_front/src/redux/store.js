import {configureStore} from '@reduxjs/toolkit'
import {usersReducer} from './slices/users'
import {userReducer} from './slices/user'
import {securityReducer} from "./slices/security";

export default configureStore({
    reducer: {
        users: usersReducer,
        user: userReducer,
        security: securityReducer
    }
});