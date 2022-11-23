import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchProductData } from './thunk';



export interface ProductState {
  loading: boolean,
  moreLoading: boolean,
  error: string | null,
  moreError: string | null,
  isListEnd: boolean,
  data: Array<any>
}

const initialState: ProductState = {
  loading: false,
  moreLoading: false,
  error: null,
  moreError: null,
  isListEnd: false,
  data: []
}


export const productSlice = createSlice({
  name: "product",
  initialState: initialState,

  reducers: {


  },

  extraReducers: (build) => {


    // NOTE: Specify the handling for pending, fulfill and rejected cases
    build.addCase(fetchProductData.pending, (state: ProductState) => {
      console.log("pending: ", state.loading)
    })
    build.addCase(fetchProductData.rejected, (state: ProductState, action: PayloadAction<{ error: string }>) => {
      console.log("rejected: ", action.payload.error)
      state.error = action.payload.error
    })
    build.addCase(fetchProductData.fulfilled, fetchMoreData)

  }

})

export default productSlice.reducer


const fetchMoreData = (state: ProductState = initialState, action: any) => {
  switch (action.type) {
    case "API_REQUEST":
      if (action.payload.page === 1) {
        return { ...state, loading: true }
      } else {
        return { ...state, moreLoading: true }
      }
    case "API_SUCCESS":
      return {
        ...state,
        data: [...state.data, ...action.data.articles],
        error: "",
        loading: false,
        moreLoading: false
      }
    case "API_FAILURE":
      return {
        ...state,
        error: action.error,
        loading: false,
        moreLoading: false
      }
    case "API_LIST_END":
      return {
        ...state,
        isListEnd: true,
        loading: false,
        moreLoading: false
      }




  }

}