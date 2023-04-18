import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchUsers} from "./users";

// export const fetchFeeds = createAsyncThunk("feed/fetchFeeds",
//     async (token) => {
//         const {data} = await axios.get("http://localhost:8080/feed",
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                 }
//             });
//         console.log(data)
//         return data
//     })

// const initialState = {
//     feeds: [],
//     status: 'idle',
//     error: null
// }

const initialState = {
    feeds: [
        {"id": "1", "author": {"id": "1", "name": "user1"}, "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
                "A ab ad aut commodi debitis delectus dolore ea, eveniet exercitationem fugit minima, modi nam, provident sit tempora ullam ut velit veniam."},
        {"id": "2", "author": {"id": "2", "name": "user2"}, "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
                "A ab ad aut commodi debitis delectus dolore ea, eveniet exercitationem fugit minima, modi nam, provident sit tempora ullam ut velit veniam."},
        {"id": "3", "author": {"id": "3", "name": "user3"}, "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
                "A ab ad aut commodi debitis delectus dolore ea, eveniet exercitationem fugit minima, modi nam, provident sit tempora ullam ut velit veniam."},
        {"id": "4", "author": {"id": "4", "name": "user4"}, "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." +
                "A ab ad aut commodi debitis delectus dolore ea, eveniet exercitationem fugit minima, modi nam, provident sit tempora ullam ut velit veniam."},
    ],

    status: 'idle',
    error: null
}


const feedsSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {},
    // extraReducers(builder) {
    //     builder
    //         .addCase(fetchFeeds.pending, (state, action) => {
    //             state.status = 'loading'
    //         })
    //         .addCase(fetchFeeds.fulfilled, (state, action) => {
    //             state.status = 'succeeded'
    //             // Add any fetched posts to the array
    //             state.feeds = state.feeds.concat(action.payload)
    //         })
    //         .addCase(fetchFeeds.rejected, (state, action) => {
    //             state.status = 'failed'
    //             state.error = action.error.message
    //         })
    // }
});


export const selectAllFeeds = (state) => state.feeds.feeds
export const selectFeedById = (state, feedId) =>
    state.feeds.feeds.find(feed => feed.id === feedId)
export const feedsReducer = feedsSlice.reducer