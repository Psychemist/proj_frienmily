import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin } from './thunk';


export interface UserState {
    isLoggedIn: boolean,
    displayName: string,
    errMsg: string
}


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        displayName: "(none)",
        errMsg: "(none)"
    } as UserState
    ,

    // NOTE: reducers handle Sync cases
    reducers: {
        rename: {
            reducer: (state: UserState, action: PayloadAction<{ displayName: string }>) => {
                console.log('rename reducer =', action.payload)
                state.displayName = action.payload.displayName
            },
            prepare: (firstName: string, lastName: string) => {
                let displayName = firstName.toUpperCase() + " " + lastName.toUpperCase()
                return {
                    // this is the action, which will be the param of reducer
                    type: "",
                    payload: { displayName },
                }
            },
        },

    },

    // NOTE: extraReducers handle Async cases
    extraReducers: (build) => {
        // NOTE: Specify the handling for pending, fulfill and rejected cases
        build.addCase(fetchLogin.pending, (state: UserState) => {
            console.log("pending: ", state.isLoggedIn)
        })

        build.addCase(fetchLogin.fulfilled, (state: UserState, action: PayloadAction<{ displayName: string }>) => {
            console.log("fulfilled: ", action.payload.displayName)
            state.displayName = action.payload.displayName
        })

        build.addCase(fetchLogin.rejected, (state: UserState, action: PayloadAction<{ error: string }>) => {
            console.log("rejected: ", action.payload.error)
            state.errMsg = action.payload.error
        })
    }
})


export default userSlice.reducer