import { createSlice } from "@reduxjs/toolkit"
import Thread from "../../models/Thread"
import ThreadItem from "../../models/ThreadItem"

export interface UserPayload {
    id: string,
    email: string,
    userName: string,
    threads?: Array<Thread>,
    threadItems?: Array<ThreadItem>
}

const initialState: UserPayload = {
    id: "",
    email: "",
    userName: "",
    threads: [],
    threadItems: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile: (state: any, action: any) => {
            return state = action.payload
        },
        setLogOutUserProfile: (state: any) => {
            return state = {
                id: "",
                email: "",
                userName: "",
                threads: [],
                threadItems: []
            }
        }
    }
})

export const { setUserProfile, setLogOutUserProfile } = userSlice.actions

export default userSlice.reducer