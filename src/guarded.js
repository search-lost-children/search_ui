import React, {useEffect, useState} from 'react';
import {Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "./components/loading/Loading";
import axios from "axios";
import {serverURL} from "./config";
import {login} from "./features/userSlice";

const GuardedRoute = ({component: Component, ...rest}) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    useEffect(()=> { if (user === undefined) {
        axios.get(`${serverURL}/api/v1/auth`).then(function (res) {
                if (res.data) {
                    dispatch(login(res.data))
                }
                setIsLoading(false)
            }
        )
    }else{
        setIsLoading(false)
    }},[])

    if (isLoading){
        return <Loading></Loading>
    }

    return (<Route {...rest} render={

        (props) => {
            if(user){
                if(rest.justFor === undefined || rest.justFor.includes(user.role)) {
                    return <Component {...props} />
                } else {
                    return <Redirect to='/'/>
                }
            }else{
                return <Redirect to='/login_page'/>
            }

        }}/>)
}

export default GuardedRoute;