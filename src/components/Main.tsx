import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserProfile } from "../store/userSlice";

const Main = () => {
    const user = useSelector((state: any) => state.user.user)
    const dispatch = useDispatch()

    const loadUser = () => {
        dispatch(setUserProfile(1))
    }

    useEffect(() => {
        loadUser()
    }, [])
  
    return (
        <main className="content">
            <div>{user.userName}</div>
        </main>
    )
};

export default Main;
