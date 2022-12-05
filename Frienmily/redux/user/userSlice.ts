import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchUpdateEmail, fetchUpdateGender, fetchUpdateMobileNumber, fetchUpdateProfilePicture, getStoredAuth } from './thunk';
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
    isLoggedOut: boolean,
    isGuest: boolean
}

const initialState: UserState = {
    isLoggedIn: false,
    userId: 0,
    username: "",
    email: null,
    mobile: null,
    gender: "Others",
    profilePicture: null,
    errMsg: null,
    isLoggedOut: false,
    isGuest: false
}

const prepareInitialState: () => Promise<UserState> = async () => {
    // let token = await AsyncStorage.getItem("token")
    // console.log("token: ", token)
    // let result = jwt_decode(token!)
    // console.log("result: ", result)

    // return { ...initialState, ...result! }
    let token = await AsyncStorage.getItem("token")
    if (token) {
        let payload = jwt_decode<{
            userId: number;
            username: string;
            gender: string | null;
            mobile: string | null;
            email: string | null;
        }>(token) as UserState
        return payload
    }
    return {
        isLoggedIn: false,
        userId: 0,
        username: "(none)",
        email: null,
        mobile: null,
        gender: "Others",
        profilePicture: null,
        errMsg: null
    } as UserState
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,

    // NOTE: reducers handle Sync cases
    reducers: {
        reLogin(state: UserState, params: PayloadAction<string>) {
            const token = params.payload
            let payload = jwt_decode<{
                userId: number;
                username: string;
                gender: string | null;
                mobile: string | null;
                email: string | null;
                profilePicture: string | null;
            }>(token)
            AsyncStorage.setItem("token", token)

            state.isLoggedIn = true
            state.userId = payload.userId
            state.username = payload.username
            state.gender = payload.gender
            state.mobile = payload.mobile
            state.email = payload.email
            state.profilePicture = payload.profilePicture
        },
        logout(state: UserState) {
            for (let key in initialState) {
                // @ts-ignore
                let value = initialState[key]
                // @ts-ignore
                state[key] = value
            }
            state.isLoggedOut = true
            AsyncStorage.removeItem("token")

        },
        guestLogin(state: UserState) {
            state.isGuest = true
        }


    },

    // NOTE: extraReducers handle Async cases
    extraReducers: (build) => {


        // NOTE: Specify the handling for pending, fulfill and rejected cases
        build.addCase(fetchLogin.pending, (state: UserState) => {
            console.log("pending: ", state.isLoggedIn)
        })
        build.addCase(fetchLogin.rejected, (state: UserState, action: PayloadAction<{ error: string }>) => {
            console.log("rejected: ", action.payload.error)
            state.errMsg = action.payload.error
        })
        build.addCase(fetchLogin.fulfilled, login)
        build.addCase(fetchUpdateGender.fulfilled, updateGender)
        build.addCase(fetchUpdateMobileNumber.fulfilled, updateMobileNumber)
        build.addCase(fetchUpdateEmail.fulfilled, updateEmail)
        build.addCase(fetchUpdateProfilePicture.fulfilled, updateProfilePicture)
        build.addCase(getStoredAuth.fulfilled, updateAuth)
    }
})

export const { logout, reLogin, guestLogin } = userSlice.actions



const login = (state: UserState, action: PayloadAction<{ token: string }>) => {
    const token = action.payload.token
    console.log('userSlice token get after login:', token)
    let payload = jwt_decode<{
        userId: number;
        username: string;
        gender: string | null;
        mobile: string | null;
        email: string | null;
        profilePicture: string | null
    }>(token)
    AsyncStorage.setItem("token", token)

    state.isLoggedIn = true
    state.userId = payload.userId
    state.username = payload.username
    state.gender = payload.gender
    state.mobile = payload.mobile
    state.email = payload.email
    state.profilePicture = payload.profilePicture


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
        profilePicture: string | null
    }>(token)
    AsyncStorage.setItem("token", token)

    state.gender = payload.gender

    console.log("state of gender : ", state.gender)
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
        profilePicture: string | null
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
        profilePicture: string | null
    }>(token)
    AsyncStorage.setItem("token", token)

    state.email = payload.email

    console.log("fulfilled : ", state.isLoggedIn)
    console.log("payload: ", payload)
}

const updateProfilePicture = (state: UserState, action: PayloadAction<{ token: string }>) => {
    const token = action.payload.token
    console.log('userSlice token get after updating profile picture:', token)
    let payload = jwt_decode<{
        userId: number;
        username: string;
        gender: string | null;
        mobile: string | null;
        email: string | null;
        profilePicture: string | null
    }>(token)
    AsyncStorage.setItem("token", token)

    state.profilePicture = payload.profilePicture

    console.log("fulfilled : ", state.isLoggedIn)
    console.log("payload: ", payload)
}

const updateAuth = (state: any, action: any) => {
    console.log('action payload = ', action.payload)
    for (let key in action.payload) {
        state[key] = action.payload[key]
    }
    state.isLoggedIn = true
}

export default userSlice.reducer