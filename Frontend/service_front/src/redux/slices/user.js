import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useDispatch} from "react-redux";

export const fetchUser = createAsyncThunk("profile/fetchUser",
    async (token) => {
        const response = await axios.get("http://localhost:8080/person",
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            });
        return response.data
    })

export const fetchUserById = createAsyncThunk("profile/fetchUserById",
    async (info) => {
    const {token, userId} = info;
        const {data} = await axios.get(`http://localhost:8080/person/${userId}`,
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            });
        return data
    })

const initialState = {
    user: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchUserById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});


export const selectUser = (state) => state.user.user
export const selectUserStatus = (state) => state.user.status
export const userReducer = userSlice.reducer