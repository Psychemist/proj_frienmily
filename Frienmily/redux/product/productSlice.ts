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
  exploreProductData: Array<any>,
  top5ProductData: Array<any>
}

const initialState: ProductState = {
  loading: false,
  moreLoading: false,
  error: null,
  moreError: null,
  isListEnd: false,
  exploreProductData: [],
  top5ProductData: []
}


export const productSlice = createSlice({
  name: "product",
  initialState: initialState,

  reducers: {


  },

  extraReducers: (build) => {


    // NOTE: Specify the handling for pending, fulfill and rejected cases
    build.addCase(fetchProductData.pending, (state: ProductState) => {
      console.log("pending")
    })
    build.addCase(fetchProductData.rejected, (state: ProductState, action: PayloadAction<{ error: string }>) => {
      console.log("rejected: ", action.payload.error)
      state.error = action.payload.error
    })
    build.addCase(fetchProductData.fulfilled, fetchMoreData)
    console.log("fulfilled")

  }

})

export default productSlice.reducer


const fetchMoreData = (state: ProductState = initialState, action: any) => {
  const exploreResults = action.payload.result.exploreResults
  const top5Results = action.payload.result.top5Results
  console.log("exploreResults reveiced at productSlice : ", exploreResults)
  console.log("number of Explore product fetched = ", exploreResults.length)
  console.log("top5Results reveiced at productSlice : ", top5Results)
  console.log("number of Top 5 product fetched = ", top5Results.length)
  let isNoMoreProduct;
  if (exploreResults.length == 0) {
    isNoMoreProduct = true
  } else {
    isNoMoreProduct = false
  }


  return {
    ...state,
    exploreProductData: [...state.exploreProductData, ...exploreResults],
    top5ProductData: [...top5Results],
    error: "",
    isListEnd: isNoMoreProduct
    // loading: false,
    // moreLoading: false
  }






  // switch (action.type) {
  //   case "API_REQUEST":
  //     if (action.payload.page === 1) {
  //       return { ...state, loading: true }
  //     } else {
  //       return { ...state, moreLoading: true }
  //     }
  //   case "API_SUCCESS":
  //     return {
  //       ...state,
  //       data: [...state.data, ...action.payload.result.exploreResults],
  //       error: "",
  //       loading: false,
  //       moreLoading: false
  //     }
  //   case "API_FAILURE":
  //     return {
  //       ...state,
  //       error: action.error,
  //       loading: false,
  //       moreLoading: false
  //     }
  //   case "API_LIST_END":
  //     return {
  //       ...state,
  //       isListEnd: true,
  //       loading: false,
  //       moreLoading: false
  //     }

  // }

}