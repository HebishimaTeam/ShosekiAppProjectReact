import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchBook: '',
}

const sessionSlice = createSlice({
    name: "session",
    initialState: initialState,
    reducers: {
        SOME_ACTION: (state, action) => {
            // some process....
            state.searchBook = action.payload;
            // newState
            return state;
        }
    }
})

export const { actions, reducer } = sessionSlice

export const { SOME_ACTION } = actions

export default reducer
