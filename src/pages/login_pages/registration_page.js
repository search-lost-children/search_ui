import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar/Snackbar";

function Registration_page() {

    const [NewLogin, setNewLogin] = useState('');
    const [NewFirstName, setNewFirstName] = useState('');
    const [NewLastName, setNewLastName] = useState('');
    const [NewPhoneNumber, setNewPhoneNumber] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [NewPasswordVer, setNewPasswordVer] = useState('');
    const [NewError, setNewError] = useState('');
    const [open, setOpen] = React.useState(false);
    const history = useHistory();


    function verification() {

        return (!NewLogin) || (!NewPassword) || !(NewPassword === NewPasswordVer) || (!NewPhoneNumber) || (!NewFirstName)

    }

    async function verif_good(Password, PasswordVer) {


        axios.post('http://localhost:3000/api/v1/registration', {
            login: NewLogin,
            password: NewPassword,
            firstName: NewFirstName,
            lastName: NewLastName,
            phoneNumber: NewPhoneNumber
        }).then(() => {
            history.push('/login_page')
        }, ({response}) => {
            if (response.data.code === 23505) {
                setNewError("login is already taken")
            }else{
                setNewError(`invalid value in the ${response.data.details[0].context.key} field`)
            }
            setOpen(true)
        });
    }
    return (
        <div className="About">
            <h1>Registration page</h1>

            <Input type='login' label={'Login'} value={NewLogin} onChange={(val) => setNewLogin((val))}></Input>
            <Input type='string' label={'имя'} value={NewFirstName} onChange={(val) => setNewFirstName((val))}></Input>
            <Input type='string' label={'фамилия'} value={NewLastName}
                   onChange={(val) => setNewLastName((val))}></Input>
            <Input type='string' label={'номер телефона'} value={NewPhoneNumber}
                   onChange={(val) => setNewPhoneNumber((val))}></Input>
            <Input type='password' label={'пароль'} value={NewPassword}
                   onChange={(val) => setNewPassword((val))}></Input>
            <Input type='password' label={'подтверждение пароля'} value={NewPasswordVer}
                   onChange={(val) => setNewPasswordVer((val))}></Input>

            <Button disabled={verification()} value={'Registration'} onClick={() => verif_good()}></Button>


            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => {
                    setOpen(false)
                }}
                message={NewError}
            />
        </div>
    )
}

export default Registration_page