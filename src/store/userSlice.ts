import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import type { RootState } from "./store"

interface UserInterface {
    userId: number 
    userName: string | null
}

const initialState: UserInterface = {
    userId: 0,
    userName: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserInterface>) => {
            return action.payload
        }
    }
})

export const { setUserProfile } = userSlice.actions

export default userSlice.reducer