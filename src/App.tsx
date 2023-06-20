import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./store/hooks";
import { Route, Routes } from "react-router-dom";
import Home from "./components/routes/Home";
import Thread from "./components/routes/Thread/Thread";
import RedirectPage from "./components/fallback/RedirectPage";
import UserProfile from "./components/routes/UserProfile/UserProfile";
import { gql, useQuery } from "@apollo/client";
import { setCategory } from "./store/categories/categorySlice";
import useRefreshReduxMe from "./hook/useRefreshReduxMe";

const GET_ALL_CATEGORY = gql`
    query getAllCategories {
        getAllCategories {
            id
            name
        }
    }
`

function App() {
    const { data: categoriesData } = useQuery(GET_ALL_CATEGORY)
    const { execMe, updateMe } = useRefreshReduxMe()
    const dispatch = useAppDispatch();

    useEffect(() => {
        execMe()
    }, [execMe]);

    useEffect(() => {
        updateMe()
    }, [updateMe])

    useEffect(() => {
        if (categoriesData && categoriesData.getAllCategories) {
            dispatch(
                setCategory({
                    payload: categoriesData.getAllCategories
                })
            )
        }
    }, [dispatch, categoriesData]);

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
