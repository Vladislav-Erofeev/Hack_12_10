import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from 'universal-cookie'
import axios from "axios";
import jwt from "jwt-decode";
import {fetchUser} from "./user";
import {useDispatch} from "react-redux";

const cookies = new Cookies()


export const auth = createAsyncThunk("security/auth",
    async (info) => {
        // const dispatch = useDispatch()
        const {data} = await axios.post("http://localhost:8080/login", info)
        const decoded = jwt(data.token)
        cookies.set('token', data.token, {path: '/', expires: new Date(Date.now() + decoded.exp)})
        // dispatch(fetchUser(data.token))
        return data
    })

export const reg = createAsyncThunk("security/reg",
    async (info) => {
        const {data} = await axios.post("http://localhost:8080/registration", info)
        const decoded = jwt(data.token)
        cookies.set('token', data.token, {path: '/', expires: new Date(Date.now() + decoded.exp)})
        return data
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
    }
})

export const getToken = (state) => state.security.token
export const securityReducer = securitySlice.reducer