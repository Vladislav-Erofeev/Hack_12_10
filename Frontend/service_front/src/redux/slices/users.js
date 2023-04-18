import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchUsers = createAsyncThunk("people/fetchUsers",
//     async (token) => {
//         const {data} = await axios.get("http://localhost:8080/friends",
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });
//         return data
//     })

// const initialState = {
//     users: [],
//     status: 'idle',
//     error: null
// }

const initialState = {
    users: [
        {"id": "1", "username": "user1", "bestScore": 1000},
        {"id": "2", "username": "user2", "bestScore": 2000},
    ],
    status: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    // extraReducers(builder) {
    //     builder
    //         .addCase(fetchUsers.pending, (state, action) => {
    //             state.status = 'loading'
    //         })
    //         .addCase(fetchUsers.fulfilled, (state, action) => {
    //             state.status = 'succeeded'
    //             // Add any fetched posts to the array
    //             state.posts = state.posts.concat(action.payload)
    //         })
    //         .addCase(fetchUsers.rejected, (state, action) => {
    //             state.status = 'failed'
    //             state.error = action.error.message
    //         })
    // }
});


export const selectAllUsers = (state) => state.users.users
export const selectUserById = (state, userId) =>
    state.users.users.find(user => user.id === userId)
export const usersReducer = usersSlice.reducer