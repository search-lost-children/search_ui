import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import notificationsReducer from './features/notificationSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationsReducer
    },
})