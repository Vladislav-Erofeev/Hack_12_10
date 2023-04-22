import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from 'universal-cookie'
import axios from "axios";
import jwt from "jwt-decode";

const cookies = new Cookies()


export const auth = createAsyncThunk("security/auth",
    async (info) => {
        const {data} = await axios.post("http://localhost:8080/login", info)
        const decoded = jwt(data.token)
        cookies.set('token', data.token, {path: '/', expires: new Date(Date.now() + decoded.exp)})
        return data.token
    })

export const reg = createAsyncThunk("security/reg",
    async (info) => {
        const {data} = await axios.post("http://localhost:8080/registration", info)
        const decoded = jwt(data.token)
        cookies.set('token', data.token, {path: '/', expires: new Date(Date.now() + decoded.exp)})

        return data.token
    }
)

export const getCookies = createAsyncThunk("security/cookies",
    async () => {
        return await cookies.get('token')
    }
)

const initialState = {
    token: null,
    status: "idle",
    error: null
}

const securitySlice = createSlice({
    name: "security",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(auth.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(auth.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload

            })
            .addCase(auth.rejected, (state, action) => {
                state.status = 'failed'
                state.token = null
                state.error = action.error.message
            })
            .addCase(reg.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(reg.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload
            })
            .addCase(reg.rejected, (state, action) => {
                state.status = 'failed'
                state.token = null
                state.error = action.error.message
            })
            .addCase(getCookies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCookies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload
            })
            .addCase(getCookies.rejected, (state, action) => {
                state.status = 'failed'
                state.token = null
                state.error = action.error.message
            })
    }
})

export const selectToken = (state) => state.auth.token

export const selectTokenStatus = (state) => state.auth.status

export const securityReducer = securitySlice.reducer