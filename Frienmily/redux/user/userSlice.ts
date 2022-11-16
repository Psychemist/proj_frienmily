import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchUpdateEmail, fetchUpdateGender, fetchUpdateMobileNumber } from './thunk';
import jwt_decode from "jwt-decode"
import { RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'



export interface UserState {
    isLoggedIn: boolean,
    userId: number | null,
    username: string,
    email: string | null,
    mobile: string | null,
    gender: string | null,
    profilePicture: string | null,
    errMsg: string | null
}


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        userId: 0,
        username: "(none)",
        email: null,
        mobile: null,
        gender: "Others",
        profilePicture: null,
        errMsg: null
    } as UserState
    ,

    // NOTE: reducers handle Sync cases
    reducers: {
        test() {
        }

    },

    // NOTE: extraReducers handle Async cases
    extraReducers: (build) => {

        // NOTE: Specify the handling for pending, fulfill and rejected cases
        build.addCase(fetchLogin.pending, (state: UserState) => {
            console.log("pending: ", state.isLoggedIn)
        })

        build.addCase(fetchLogin.fulfilled, login)

        build.addCase(fetchLogin.rejected, (state: UserState, action: PayloadAction<{ error: string }>) => {
            console.log("rejected: ", action.payload.error)
            state.errMsg = action.payload.error
        })

        build.addCase(fetchUpdateGender.fulfilled, updateGender)
        build.addCase(fetchUpdateMobileNumber.fulfilled, updateMobileNumber)
        build.addCase(fetchUpdateEmail.fulfilled, updateEmail)
    }
})

const login = (state: UserState, action: PayloadAction<{ token: string }>) => {
    const token = action.payload.token
    console.log('userSlice token get after login:', token)
    let payload = jwt_decode<{
        userId: number;
        username: string;
        gender: string | null;
        mobile: string | null;
        email: string | null;
    }>(token)
    AsyncStorage.setItem("token", token)

    state.isLoggedIn = true
    state.userId = payload.userId
    state.username = payload.username
    state.gender = payload.gender
    state.mobile = payload.mobile
    state.email = payload.email


    console.log("fulfilled : ", state.isLoggedIn)
    console.log("payload: ", payload)
}

const updateGender = (state: UserState, action: PayloadAction<{ token: string }>) => {
    const token = action.payload.token
    console.log('userSlice token get after updating gender:', token)
    let payload = jwt_decode<{
        userId: number;
        username: string;
        gender: string | null;
        mobile: string | null;
        email: string | null;
    }>(token)
    AsyncStorage.setItem("token", token)

    state.gender = payload.gender

    console.log("fulfilled : ", state.isLoggedIn)
    console.log("payload: ", payload)
}

const updateMobileNumber = (state: UserState, action: PayloadAction<{ token: string }>) => {
    const token = action.payload.token
    console.log('userSlice token get after updating mobile number:', token)
    let payload = jwt_decode<{
        userId: number;
        username: string;
        gender: string | null;
        mobile: string | null;
        email: string | null;
    }>(token)
    AsyncStorage.setItem("token", token)

    state.mobile = payload.mobile

    console.log("fulfilled : ", state.isLoggedIn)
    console.log("payload: ", payload)
}

const updateEmail = (state: UserState, action: PayloadAction<{ token: string }>) => {
    const token = action.payload.token
    console.log('userSlice token get after updating Email:', token)
    let payload = jwt_decode<{
        userId: number;
        username: string;
        gender: string | null;
        mobile: string | null;
        email: string | null;
    }>(token)
    AsyncStorage.setItem("token", token)

    state.mobile = payload.email

    console.log("fulfilled : ", state.isLoggedIn)
    console.log("payload: ", payload)
}


export default userSlice.reducer