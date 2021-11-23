import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import App from "../../App";
import axios from "axios";


function Registration_page (){

    const [NewLogin,setNewLogin] = useState('');
    const [NewPassword,setNewPassword] = useState('');
    const [NewPasswordVer,setNewPasswordVer] = useState('');
    const history  = useHistory();
    let new_user =(
            {
                login: NewLogin, password: NewPassword
            }

    )
    function verification (Password,PasswordVer,login) {
        if (login === ''){
            alert('empty login')
        }
        else if ( Password=== ''|| PasswordVer === ''){
            alert('empty password')
        }
        else if(Password === PasswordVer){
            alert('password verification ')
            axios.post('api/v1/users', new_user);
            history.push('/login_page')
        }
        else {
            alert(' failed verification ')

        }

    }
    return(
        <div className="About">
            <h1>Registration page</h1>
            <p>login</p>
            <Input type='login' label={'Login'} value={NewLogin} onChange={(val)=> setNewLogin((val))}></Input>
            <p>password</p>
            <Input type='password' label={'password'} value={NewPassword} onChange={(val)=> setNewPassword((val))}></Input>

            <p>password verification</p>
            <Input type='password' label={'password'} value={NewPasswordVer} onChange={(val)=> setNewPasswordVer((val))}></Input>

            <Button value={'Registration'} onClick={()=>verification(NewPassword, NewPasswordVer, NewLogin)}></Button>
        </div>
    )
}

export default Registration_page