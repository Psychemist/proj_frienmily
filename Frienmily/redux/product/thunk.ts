import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchProductData: any = createAsyncThunk("product/updateEmail", async (params: {
  username: string, email: string
}, thunkAPI: any) => {
  try {
    // const res = await fetch(`${process.env.REACT_APP_API_SERVER}/user/updateEmail`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username: params.username,
    //     email: params.email
    //   })
    // })
    // const data = await res.json()
    // console.log('data from thunk :', data)
    // console.log(res)
    // console.log('ok ?', res.ok)
    // if (!res.ok) {
    //   throw data.msg
    // }

    // return thunkAPI.fulfillWithValue(data)

  } catch (e) {
    console.log('catch error in thunk ', e)
    return thunkAPI.rejectWithValue({
      error: "fetch more data failed"
    })
  }
})
