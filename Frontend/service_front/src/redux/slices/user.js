import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useDispatch} from "react-redux";
import {url} from "../../services/requests";

export const fetchUser = createAsyncThunk("profile/fetchUser",
    async (token) => {
        const response = await axios.get(`${url}/person`,
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            });
        return response.data
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
    }
});


export const selectUser = (state) => state.user.user
export const selectUserStatus = (state) => state.user.status
export const userReducer = userSlice.reducer