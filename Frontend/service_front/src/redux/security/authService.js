import axios from "axios";
import Cookies from 'universal-cookie'
import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt from 'jwt-decode'
import store from "../store";
import {loginFailure, loginStart, loginSuccess} from "../slices/auth";

const cookies = new Cookies()

export const auth = createAsyncThunk("login/authService",
    async (info) => {
        const dispatch = store.dispatch
        try {
            dispatch(loginStart())
            const {data} = await axios.post("http://localhost:8080/login", info)
            const decoded = jwt(data.token)
            cookies.set('token', data.token, { path: '/', expires: new Date(Date.now() + 1000 * decoded.exp)})
            dispatch(loginSuccess(data))
        } catch (e) {
            console.log(e.message)
            dispatch(loginFailure(e.message))
        }
    }
)

export const reg = createAsyncThunk("reg/authService",
    async (info) => {
        const dispatch = store.dispatch
        try {
            dispatch(loginStart())
            const {data} = await axios.post("http://localhost:8080/registration", info)
            const decoded = jwt(data.token)
            cookies.set('token', data.token, { path: '/', expires: new Date(Date.now() + 1000 * decoded.exp)})
            console.log(decoded)
            dispatch(loginSuccess(data))
        } catch (e) {
            console.log(e.message)
            dispatch(loginFailure(e.message))
        }
    }
)