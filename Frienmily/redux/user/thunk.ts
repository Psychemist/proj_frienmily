import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchLogin: any = createAsyncThunk("user/fetchLogin", async (params: {
    username: string,
    password: string
}, thunkAPI: any) => {
    try {
        const res = await fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: params.username,
                password: params.password
            })
        })
        const data = await res.json()
        console.log(data)

        if (!res.ok) {
            throw data.msg
        }

        return thunkAPI.fulfillWithValue({
            username: data.username
        })

    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: "login failed"
        })
    }
})