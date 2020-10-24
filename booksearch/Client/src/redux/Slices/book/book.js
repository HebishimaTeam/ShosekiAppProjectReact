import { createSlice } from "@reduxjs/toolkit";

/**book sliceで管理する状態を格納したstateの初期状態 */
export const initialState = {
    searchBook: '',
}

// slice(必要に応じて分割したstore)を作成
/**book関連の情報を格納したstore */
const bookSlice = createSlice({
    name: "book",
    // book sliceの初期状態
    initialState: initialState,
    // 指定されたアクションに従ってstateを書き換える関数
    reducers: {
        searchBook: (state, action) => {
            state.searchBook = action.payload;
            // 変更したstateを返す
            return state;
        },
    }
})

export const { actions, reducer } = bookSlice

export const { searchBook } = actions

export default reducer
