import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { login, logout } from '../../features/userSlice'
import { showNotification } from '../../features/notificationSlice'
import { useDispatch } from "react-redux";
import {serverURL} from "../../config";



function Login_page (){
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const history  = useHistory();
    const dispatch = useDispatch()

    function user_login () {

        let user = {
                login: Login, 
                password: Password
            }
        axios.post(`${serverURL}/api/v1/auth`, user).then(
            function (res) {
                if(res.data){
                    sessionStorage.setItem('json', res.data.token);
                    dispatch(login(res.data))
                    history.push('/searches');
                }
            }, (resp) => {
                dispatch(showNotification({
                    duration: 5000,
                    message: 'Не верный логин или пароль',
                    severity: 'error'
                }))
            }
        );
    }
    function user_verification (login,Password) {
        if (login === '') {
            return(true)
        } else if (Password === '') {
            return (true)
        } else{
            return (false)
        }
    }

    return (
        <div className="About">

            <h1>login page</h1>

            <Input type='login' label={'Login'} value={Login} onChange={(val)=> setLogin((val))}></Input>

            <Input type='password' label={'password'} value={Password} onChange={(val)=> setPassword((val))}></Input>
            <Button disabled = {user_verification()} value={'Log in'} onClick={()=>{user_login()}}></Button>
            <Button value={'registration'} onClick={()=>{history.push('/registration_page')}}></Button>
        </div>
    )
}

export default Login_page
