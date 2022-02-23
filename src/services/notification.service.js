import {useDispatch} from "react-redux";
import {showNotification} from "../features/notificationSlice";

export function useShowError () {
    const dispatch = useDispatch()
    return (message) => {
        dispatch(showNotification({
            severity: 'error',
            message
        }))
    }
}

export function useShowSuccess (message) {
    const dispatch = useDispatch()
    return (message) => {
        dispatch(showNotification({
            severity: 'success',
            message
        }))
    }

}