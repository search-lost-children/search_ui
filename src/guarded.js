import React from 'react';
import {Route, Redirect} from "react-router-dom";

const GuardedRoute = ({component: Component,  ...rest}) => (

    <Route {...rest} render={

        (props) => {
            let jwt = sessionStorage.getItem('json')
            if (jwt || true) {
                return <Component {...props} />
            }else{
                return <Redirect to='/'/>
            }
        }}/>
)

export default GuardedRoute;