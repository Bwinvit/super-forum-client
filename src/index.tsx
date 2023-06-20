import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ErrorBoundary } from "react-error-boundary";
import FallbackRender from "./components/fallback/FallbackBoundary";
import { BrowserRouter } from "react-router-dom";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from "@apollo/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
    cache: new InMemoryCache({
        resultCaching: false
    }),
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <ErrorBoundary FallbackComponent={FallbackRender}>
                        {[<App key={"App"} />]}
                    </ErrorBoundary>
                </ApolloProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
