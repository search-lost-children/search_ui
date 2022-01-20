import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Registration_page (){

    const [NewLogin,setNewLogin] = useState('');
    const [NewPassword,setNewPassword] = useState('');
    const [NewPasswordVer,setNewPasswordVer] = useState('');
    const history  = useHistory();
    let new_user =
            {
                login: NewLogin, password: NewPassword
            }


    function verification (Password,PasswordVer,login) {

        if ( Password === ''|| PasswordVer === ''||login === ''){
            return (true)
        }
        else if(Password !== PasswordVer){
            alert(' failed verification ')
            return (true)
        }
        else{
            return (false)
        }
    }
    function verif_good(Password,PasswordVer) {
    if(Password === PasswordVer){
            alert('password verification ')
            axios.post('api/v1/users', new_user);
            history.push('/login_page')
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

            <Button disabled = {verification()} value={'Registration'} onClick={()=>verif_good(NewPassword, NewPasswordVer, NewLogin)}></Button>
        </div>
    )
}

export default Registration_page