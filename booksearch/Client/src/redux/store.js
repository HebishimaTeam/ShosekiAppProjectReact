import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";

const store = configureStore({
    reducer: {
        session: sessionReducer,
    },
    devTools: true,
})

export default store;