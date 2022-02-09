import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
    },
    reducers: {
        showNotification: (state, action) => {
            const notification = {
                ...action.payload,
                id: Math.floor(Math.random() * 10000000000)
            }
            const notifications = [...state.notifications, notification]
            state.notifications = notifications;
        },
        hideNotification: (state, action) => {
            state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
        }
    },
})

export const { hideNotification, showNotification } = counterSlice.actions

export default counterSlice.reducer