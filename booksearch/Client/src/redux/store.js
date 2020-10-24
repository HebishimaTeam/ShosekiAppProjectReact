import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./slices/session/session";
import bookReducer from "./slices/book/book";

// storeを作成
const store = configureStore({
    //この項目でslice(分割したstore)を連結
    reducer: {
        // session sliceをstoreに連結
        session: sessionReducer,
        book: bookReducer
    },
    devTools: true,
})

export default store;