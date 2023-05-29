import React, { useEffect } from "react";
import "./App.css";
import { setUserProfile } from "./store/userSlice";
import { useAppDispatch } from "./store/hooks";
import { Route, Routes } from "react-router-dom";
import Home from "./components/routes/Home";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setUserProfile({
                userId: 1,
                userName: "testUser",
            })
        );
    }, [dispatch]);

    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorythreads/:categoryId" element={<Home />} />
        </Routes>
    );
}

export default App;
