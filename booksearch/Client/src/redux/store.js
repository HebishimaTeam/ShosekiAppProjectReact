import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Slices/session/session";

// reduxで管理する状態間利用のオブジェクト store を設定
const store = configureStore({
    //この項目でsliceを連結
    reducer: {
        // slice(分割したstore)を連結
        session: sessionReducer,
    },
    devTools: true,
})

export default store;