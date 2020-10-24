import { createSlice } from "@reduxjs/toolkit";

/**session sliceで管理する状態を格納したstateの初期状態 */
export const initialState = {
    searchBook: '',
    authenticated: false
}

// slice(必要に応じて分割したstore)を作成
/**session関連の情報を格納したstore */
const sessionSlice = createSlice({
    name: "session",
    // session sliceの初期状態
    initialState: initialState,
    // 指定されたアクションに従ってstateを書き換える関数
    reducers: {
        SOME_ACTION: (state, action) => {
            // SOME_ACTIONの引数に入れた文字列をstate.searchBookに割り当てる
            state.searchBook = action.payload;
            // 変更したstateを返す
            return state;
        },
        // コンポーネントで呼び出す際は、authenticated関数の返り値をdispatch関数の引数に入れる
        // 例: "dispatch(authenticated(true))"
        // 引数はreducer関数内でaction.payloadに入る
        authenticated: (state, action) => {
            // payloadの値によってstateのauthenticatedプロパティを書き換える
            state.authenticated = action.payload
            // 変化したstateを返す
            return state;
        }
    }
})

export const { actions, reducer } = sessionSlice

export const { SOME_ACTION, authenticated } = actions

export default reducer
