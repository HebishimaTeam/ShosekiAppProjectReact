import { createSlice } from "@reduxjs/toolkit";

/**session storeで管理する状態を格納したオブジェクトの初期状態 */
const initialState = {
    searchBook: '',
    authenticated: false
}

// slice(必要に応じた分割した)を作成
/**session関連の情報を格納したstore */
const sessionSlice = createSlice({
    name: "session",
    initialState: initialState,
    reducers: {
        SOME_ACTION: (state, action) => {
            // SOME_ACTIONの引数に入れた文字列をstate.searchBookに割り当てる
            state.searchBook = action.payload;
            // 変更したstateを返す
            return state;
        },
        authenticated: (state, action) => {
            state.authenticated = action.payload
            return state;
        }
    }
})

export const { actions, reducer } = sessionSlice

export const { SOME_ACTION, authenticated } = actions

export default reducer
