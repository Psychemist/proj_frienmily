import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin } from './thunk';
import jwt_decode from "jwt-decode"
import { AsyncStorage } from 'react-native';



export interface UserState {
    isLoggedIn: boolean,
    username: string,
    fullName: string,
    email: string,
    mobile: string,
    errMsg: string
}


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        username: "(none)",
        fullName: "(none)",
        email: "(none)",
        mobile: "(none)",
        errMsg: "(none)"
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
    state.isLoggedIn = true
    const token = action.payload.token
    let payload = jwt_decode<{ fullName: string }>(token)
    AsyncStorage.setItem("token", token)
    state.fullName = payload.fullName
    console.log("fulfilled : ", state.isLoggedIn)
}


export default userSlice.reducer