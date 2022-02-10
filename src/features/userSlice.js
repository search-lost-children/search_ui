import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        user: undefined,
    },
    reducers: {
        login: (state, payload) => {
            state.user = payload.payload;
        },
        logout: (state) => {
            state.user = undefined
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions

export default counterSlice.reducer