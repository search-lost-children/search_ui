import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import axios from "axios";



function Login_page (){
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const history  = useHistory();

    let user =(
        {
            login: Login, password: Password
        }

    )

    function user_verification (login,Password) {


        if (login === '') {
            alert('empty login')
        } else if (Password === '') {
            alert('empty password')
        } else {
            alert(' verification good')
            axios.post('api/v1/users', user);

        }
    }

    return (
        <div className="About">

            <h1>login page</h1>
            <p>login</p>
            <Input type='login' label={'Login'} value={Login} onChange={(val)=> setLogin((val))}></Input>
            <p>password</p>
            <Input type='password' label={'password'} value={Password} onChange={(val)=> setPassword((val))}></Input>
            <Button value={'Log in'} onClick={()=>{user_verification(Login,Password)}}></Button>
            <Button value={'registration'} onClick={()=>{history.push('/registration_page')}}></Button>
        </div>
    )
}

export default Login_page