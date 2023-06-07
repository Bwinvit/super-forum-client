import React, { useEffect } from "react";
import "./App.css";
import { setUserProfile } from "./store/userSlice";
import { useAppDispatch } from "./store/hooks";
import { Route, Routes } from "react-router-dom";
import Home from "./components/routes/Home";
import Thread from "./components/routes/Thread/Thread";
import RedirectPage from "./components/fallback/RedirectPage";
import UserProfile from "./components/routes/UserProfile/UserProfile";

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
          <Route path="/thread/:id" element={<Thread />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="*" element={<RedirectPage />} />
        </Routes>
    );
}

export default App;
