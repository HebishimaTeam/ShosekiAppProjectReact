import { createSlice } from "@reduxjs/toolkit";

/**session sliceで管理する状態を格納したstateの初期状態 */
export const initialState = {
    isAuthorized: false,
    isAdmin: false,
}

// slice(必要に応じて分割したstore)を作成
/**session関連の情報を格納したstore */
const sessionSlice = createSlice({
    name: "session",
    // session sliceの初期状態
    initialState: initialState,
    // 指定されたアクションに従ってstateを書き換える関数
    reducers: {
        // コンポーネントで呼び出す際は、authenticated関数の返り値をdispatch関数の引数に入れる
        // 例: "dispatch(authenticated(true))"
        // 引数はreducer関数内でaction.payloadに入る
        login: (state, action) => {
            state.isAuthorized = true
            state.isAdmin = action.payload.isAdmin
        },
        logout: (state, action) => {
            state.isAuthorized = false
            return state
        }
    }
})

export const { actions, reducer } = sessionSlice

//dispatch関数の引数にこれらの関数の戻り値を投入する
export const { login, logout } = actions

export default reducer
