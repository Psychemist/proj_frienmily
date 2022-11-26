import { REACT_APP_API_SERVER } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit"


export const fetchProductData: any = createAsyncThunk("product/fetchProductData", async (params: {
  categoryArray: any, page: number, isRenewList: boolean
}, thunkAPI: any) => {
  try {
    const QTY_IN_ONE_BATCH = 30

    console.log("categoryArray received at thunk=", params.categoryArray)
    console.log("page number received at thunk=", params.page)
    console.log("isNewList received at thunk=", params.isRenewList)

    let catIds = params.categoryArray
    let page = params.page

    if (catIds.length == 0 || isNaN(page) || page == undefined) {
      console.log("catIds or page is not valid at thunk. No fetching")
      return
    }

    const res = await fetch(
      `${REACT_APP_API_SERVER}/goods/productByBatchAndCatId/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qtyInOneBatch: QTY_IN_ONE_BATCH,
          ItemsToBeSkipped: page * QTY_IN_ONE_BATCH,
          catIds: catIds
        }),
      },
    );
    const data = await res.json()
    const isRenewList = params.isRenewList
    if (!res.ok) {
      throw data.msg
    }

    return thunkAPI.fulfillWithValue({ data, isRenewList })


  } catch (e) {
    console.log('catch error in thunk ', e)
    return thunkAPI.rejectWithValue({
      error: "fetch more data failed"
    })
  }
})

