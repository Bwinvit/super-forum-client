import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import type { RootState } from "./store"

interface UserInterface {
    userId: number | null
    userName: string | null
}

const initialState: UserInterface = {
    userId: null,
    userName: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserInterface>) => {
            state.userId = action.payload.userId
            state.userName = action.payload.userName
        }
    }
})

export const { setUserProfile } = userSlice.actions

export default userSlice.reducer