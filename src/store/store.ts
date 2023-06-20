import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import categoryReducer from './categories/categorySlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch