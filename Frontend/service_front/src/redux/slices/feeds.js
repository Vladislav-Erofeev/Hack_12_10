import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeeds = createAsyncThunk("feed/fetchFeeds",
    async (token) => {
        const {data} = await axios.get("http://localhost:8080/feed",
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

const feedsSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchFeeds.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchFeeds.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.feeds = state.feeds.concat(action.payload)
            })
            .addCase(fetchFeeds.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});


export const selectAllFeeds = (state) => state.feeds.feeds
export const selectFeedById = (state, feedId) =>
    state.feeds.feeds.find(feed => feed.id === feedId)
export const feedsReducer = feedsSlice.reducer