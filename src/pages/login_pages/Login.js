import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import { login, logout } from '../../features/userSlice'
import { useDispatch } from "react-redux";

function Login_page (){
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const history  = useHistory();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    let user =
        {
            login: Login, password: Password
        }

    function user_login () {


            axios.post('http://localhost:3000/api/v1/auth', user).then(
                function (res) {
                    if(res.data){
                        sessionStorage.setItem('json', res.data);
                        dispatch(login(res.data))
                        history.push('/');
                    }
                }, (resp) => {
                    setOpen(true)
                    console.log(resp)
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

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => {setOpen(false)}}
                message="Login failed"
            />

        </div>
    )
}

export default Login_page