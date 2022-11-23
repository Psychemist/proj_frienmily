import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from './user/userSlice'
import productReducer, { ProductState } from './product/productSlice'

export interface RootState {
    user: UserState,
    product: ProductState

}


const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer
    },
    devTools: true
})

export default store