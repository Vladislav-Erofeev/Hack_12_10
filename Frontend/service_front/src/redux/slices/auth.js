import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const initialState = {
    authData: {
        token: null,
        status: "loading",
        error: null
    },
    profileData: {
        profile: null,
        status: "loading",
        error: null
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => ({
            ...state,
            authData: {
                ...state.authData,
                status: "loading"
            }
        }),
        loginSuccess: (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                authData: {
                    ...state.authData,
                    token: action.payload.token,
                    status: "loaded"
                }
            }
        },
        loginFailure: (state, action) => ({
            ...state,
            authData: {
                ...state.authData,
                status: "error",
                error: action.payload
            }
        }),
        loadProfileStart: (state) => ({
            ...state,
            profileData: {
                ...state.profileData,
                status: "loading"
            }
        }),
        loadProfileSuccess: (state, action) => ({
            ...state,
            profileData: {
                ...state.profileData,
                profile: action.payload,
                status: "loaded"
            }
        }),
        loadProfileFailure: (state, action) => ({
            ...state,
            profileData: {
                ...state.profileData,
                status: "error",
                error: action.payload
            }
        }),
        logout: () => {
            cookies.remove('token', {path: "/admin" })
            return initialState
        }
    }
})

export const authSelector = (state) => state.auth.authData
export const authReducer = authSlice.reducer
export const { loginStart, loginSuccess, loginFailure, loadProfileStart, loadProfileSuccess, loadProfileFailure, logout } = authSlice.actions