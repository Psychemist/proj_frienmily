import { createAsyncThunk } from "@reduxjs/toolkit";
import { GENDERS } from "../../components/Account";



export const fetchLogin: any = createAsyncThunk("user/fetchLogin", async (params: {
    username: string,
    password: string
}, thunkAPI: any) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: params.username,
                password: params.password
            })
        })
        const data = await res.json()
        console.log('data from thunk :', data)
        console.log(res)
        console.log('ok ?', res.ok)
        if (!res.ok) {
            throw data.msg
        }

        return thunkAPI.fulfillWithValue(data)

    } catch (e) {
        console.log('catch error in thunk ', e)
        return thunkAPI.rejectWithValue({
            error: "login failed"
        })
    }
})

export const fetchUpdateGender: any = createAsyncThunk("user/fetchUpdateGender", async (params: {
    username: string, gender: number
}, thunkAPI: any) => {
    try {
        console.log("gender received at thunk: ", params.gender)
        let genderName = GENDERS[params.gender]
        console.log("gender name: ", genderName)

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/user/updateGender`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: params.username,
                gender: genderName
            })
        })
        const data = await res.json()
        console.log('data from thunk :', data)
        console.log(res)
        console.log('ok ?', res.ok)
        if (!res.ok) {
            throw data.msg
        }

        return thunkAPI.fulfillWithValue(data)

    } catch (e) {
        console.log('catch error in thunk ', e)
        return thunkAPI.rejectWithValue({
            error: "update gender failed"
        })
    }
})

export const fetchUpdateMobileNumber: any = createAsyncThunk("user/fetchUpdateMobileNumber", async (params: {
    username: string, mobile: string
}, thunkAPI: any) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/user/updateMobileNumber`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: params.username,
                mobile: params.mobile
            })
        })
        const data = await res.json()
        console.log('data from thunk :', data)
        console.log(res)
        console.log('ok ?', res.ok)
        if (!res.ok) {
            throw data.msg
        }

        return thunkAPI.fulfillWithValue(data)

    } catch (e) {
        console.log('catch error in thunk ', e)
        return thunkAPI.rejectWithValue({
            error: "update mobile number failed"
        })
    }
})

export const fetchUpdateEmail: any = createAsyncThunk("user/updateEmail", async (params: {
    username: string, email: string
}, thunkAPI: any) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/user/updateEmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: params.username,
                email: params.email
            })
        })
        const data = await res.json()
        console.log('data from thunk :', data)
        console.log(res)
        console.log('ok ?', res.ok)
        if (!res.ok) {
            throw data.msg
        }

        return thunkAPI.fulfillWithValue(data)

    } catch (e) {
        console.log('catch error in thunk ', e)
        return thunkAPI.rejectWithValue({
            error: "update mobile number failed"
        })
    }
})


