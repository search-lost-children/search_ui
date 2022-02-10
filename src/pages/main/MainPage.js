import {useSelector} from "react-redux";
import AdminView from "./AdminView";
import UserView from "./UserView";

export default function MainPage () {
    const user = useSelector((state) => state.user.user)

    if (user.role === 'admin'){
        return <AdminView />
    } else {
        return <UserView />
    }
}