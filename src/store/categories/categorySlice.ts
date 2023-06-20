import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Category from "../../models/Category"

export interface ThreadCategoriesAction {
      payload: Array<Category>;
}

const initialState: ThreadCategoriesAction = {
      payload: []
}

export const categorySlice = createSlice({
      name: "category",
      initialState,
      reducers: {
            setCategory: (state, action: PayloadAction<ThreadCategoriesAction>) => {
                  return action.payload
            }
      }
})

export const { setCategory } = categorySlice.actions

export default categorySlice.reducer