import { REACT_APP_API_SERVER } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchProductData: any = createAsyncThunk("product/fetchProductData", async (params: {
  categoryArray: any
}, thunkAPI: any) => {
  try {
    console.log("categoryArray received at thunk=", params.categoryArray)
    let catIds = params.categoryArray

    if (catIds) {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/goods/productByBatchAndCatId/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qtyInOneBatch: 30,
            ItemsToBeSkipped: 0,
            catIds: catIds
          }),
        },
      );
      const data = await res.json()
      if (!res.ok) {
        throw data.msg
      }

      return thunkAPI.fulfillWithValue(data)
    }

  } catch (e) {
    console.log('catch error in thunk ', e)
    return thunkAPI.rejectWithValue({
      error: "fetch more data failed"
    })
  }
})
