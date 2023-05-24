import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserProfile } from "../store/userSlice";

const Main = () => {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setUserProfile({
            userId: 1,
            userName: "Dave"
        }))
    }, [dispatch])
  
    return (
        <main className="content">
            <div>{user.userId}</div>
        </main>
    )
};

export default Main;
