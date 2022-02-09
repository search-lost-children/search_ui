import {useDispatch, useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import React from "react";
import { hideNotification } from '../../features/notificationSlice'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification () {
    const dispatch = useDispatch()
    const _notifications = useSelector((state)=> {
        debugger
        return state.notifications.notifications
    });

    const notifications = _notifications.map((notification, i) => {
        return (<Snackbar
            key={'notification-'+i}
            open={true}
            autoHideDuration={notification.duration || 5000}
            onClose={() => dispatch(hideNotification(notification.id))}
        >
            <Alert severity={notification.severity}>{notification.message}</Alert>
        </Snackbar>)
    })

    return (<div>
        {notifications}
    </div>)
}