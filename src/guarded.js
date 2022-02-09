import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const GuardedRoute = ({component: Component,  ...rest}) => {
    useSelector((state) => {
        console.log(state.user.user);
        return state
    })


    return (<Route {...rest} render={

        (props) => {
            let jwt = sessionStorage.getItem('json')
            if (jwt) {
                return <Component {...props} />
            }else{
                return <Redirect to='/'/>
            }
        }}/>)
}

export default GuardedRoute;