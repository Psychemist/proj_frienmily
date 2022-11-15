import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin } from './thunk';
import jwt_decode from "jwt-decode"
import { RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'



export interface UserState {
    isLoggedIn: boolean,
    userId: number | null,
    username: string,
    email: string | null,
    mobile: string | null,
    isMale: boolean | null,
    profilePicture: string | null,
    errMsg: string | null
}


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        userId: 0,
        username: "(none)",
        email: "(none)",
        mobile: "(none)",
        isMale: null,
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
    }
})

const login = (state: UserState, action: PayloadAction<{ token: string }>) => {
    const token = action.payload.token
    console.log('useSlice login token:', token)
    let payload = jwt_decode<{
        id: number;
        username: string;
        isMale: boolean | null;
        mobile: string | null;
        email: string | null;
    }>(token)
    AsyncStorage.setItem("token", token)

    state.isLoggedIn = true
    state.userId = payload.id
    state.username = payload.username
    state.isMale = payload.isMale
    state.mobile = payload.mobile
    state.email = payload.email


    console.log("fulfilled : ", state.isLoggedIn)
}


export default userSlice.reducer