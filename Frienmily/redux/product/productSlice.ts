import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RefreshControlBase } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchProductData } from './thunk';



export interface ProductState {
  isInitialLoading: boolean,
  isCurrentlyLoading: boolean,
  error: string | null,
  moreError: string | null,
  isListEnd: boolean,
  exploreProductData: Array<any>,
  top5ProductData: Array<any>
}

const initialState: ProductState = {
  isInitialLoading: true,
  isCurrentlyLoading: false,
  error: null,
  moreError: null,
  isListEnd: false,
  exploreProductData: [],
  top5ProductData: []
}

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,

  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchProductData.pending, (state: ProductState) => {
      console.log("pending")
      return {
        ...state,
        isCurrentlyLoading: true
      }

    })
    build.addCase(fetchProductData.rejected, (state: ProductState, action: PayloadAction<{ error: string }>) => {
      console.log("rejected: ", action.payload.error)
      state.error = action.payload.error
      return {
        ...state,
        isCurrentlyLoading: false
      }

    })
    build.addCase(fetchProductData.fulfilled, fetchMoreData)
    console.log("fulfilled")
  }
})

export default productSlice.reducer


const fetchMoreData = (state: ProductState = initialState, action: any) => {
  const exploreResults = action.payload.data.result.exploreResults
  const top5Results = action.payload.data.result.top5Results

  console.log("*************** action.payload: ", action.payload)

  // console.log("========================= action.payload.isRenewList: ", action.payload.isRenewList)
  // console.log("exploreResults reveiced at productSlice : ", exploreResults)
  // console.log("number of Explore product fetched = ", exploreResults.length)
  // console.log("top5Results reveiced at productSlice : ", top5Results)
  // console.log("number of Top 5 product fetched = ", top5Results.length)
  let isNoMoreProduct;
  if (exploreResults.length == 0) {
    isNoMoreProduct = true
  } else {
    isNoMoreProduct = false
  }

  // TODO: 需要有機制判斷是 Initial Loading 還是 More Loading

  // Initial Loading:
  // 1. loading triggered by category buttons
  // 2. First time entering the Groceries Page

  // More Loading:
  // 1. Scroll to bottom (while the list is not ended)

  return {
    ...state,
    exploreProductData: action.payload.isRenewList ? [...exploreResults] : [...state.exploreProductData, ...exploreResults],
    // exploreProductData: [...exploreResults],
    top5ProductData: [...top5Results],
    error: "",
    isListEnd: isNoMoreProduct,
    isCurrentlyLoading: false
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