import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar/Snackbar";

function Registration_page() {

    const [newLogin, setNewLogin] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordVer, setNewPasswordVer] = useState('');
    const [newError, setNewError] = useState('');
    const [open, setOpen] = React.useState(false);
    const history = useHistory();


    function verification() {

        return (!newLogin) || (!newPassword) || !(newPassword === newPasswordVer) || (!newPhoneNumber) || (!newFirstName)

    }

    async function verif_good(Password, PasswordVer) {


        axios.post('http://localhost:3000/api/v1/registration', {
            login: newLogin,
            password: newPassword,
            firstName: newFirstName,
            lastName: newLastName,
            phoneNumber: newPhoneNumber
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

            <Input type='login' label={'Login'} value={newLogin} onChange={(val) => setNewLogin((val))}></Input>
            <Input type='string' label={'имя'} value={newFirstName} onChange={(val) => setNewFirstName((val))}></Input>
            <Input type='string' label={'фамилия'} value={newLastName}
                   onChange={(val) => setNewLastName((val))}></Input>
            <Input type='string' label={'номер телефона'} value={newPhoneNumber}
                   onChange={(val) => setNewPhoneNumber((val))}></Input>
            <Input type='password' label={'пароль'} value={newPassword}
                   onChange={(val) => setNewPassword((val))}></Input>
            <Input type='password' label={'подтверждение пароля'} value={newPasswordVer}
                   onChange={(val) => setNewPasswordVer((val))}></Input>

            <Button disabled={verification()} value={'Registration'} onClick={() => verif_good()}></Button>


            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => {
                    setOpen(false)
                }}
                message={newError}
            />
        </div>
    )
}

export default Registration_page