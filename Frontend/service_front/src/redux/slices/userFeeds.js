import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserFeeds = createAsyncThunk("profile/fetchUserFeeds",
    async (info) => {
        const {token, userId} = info;
        const {data} = await axios.get(`http://localhost:8080/feed/person/${userId}`,
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            });
        console.log(data)
        return data
    })

const initialState = {
    feeds: [],
    status: 'idle',
    error: null
}

const userFeedsSlice = createSlice({
    name: "user_feeds",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserFeeds.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })
            .addCase(fetchUserFeeds.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.feeds = state.feeds.concat(action.payload)

            })
            .addCase(fetchUserFeeds.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});


export const selectUserFeeds = (state) => state.user_feeds.feeds
export const selectUserFeedsStatus = (state) => state.user_feeds.status
export const userFeedsReducer = userFeedsSlice.reducer