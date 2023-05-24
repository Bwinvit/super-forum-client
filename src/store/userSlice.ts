import { createSlice } from "@reduxjs/toolkit";

export interface UserProfile {
    id: number
    userName: string
}

export interface UserProfileState {
    user: UserProfile | null
}

 export interface UserProfileAction {
    payload: UserProfile | null
 }

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: 0
    },
    reducers: {
        setUserProfile(state: any, action: any ) {
            if (action.payload) {
                state.user = action.payload
            }
        }
    }
})

export const { setUserProfile } = userSlice.actions

export default userSlice.reducer
