import React, {useState} from 'react';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {showNotification} from "../../features/notificationSlice";
import {serverURL} from "../../config";
import Box from '@mui/material/Box';


function Registration_page() {
    const dispatch = useDispatch()
    const [newLogin, setNewLogin] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordVer, setNewPasswordVer] = useState('');
    const history = useHistory();


    function verification() {
        return (!newLogin) || (!newPassword) || !(newPassword === newPasswordVer) || (!newPhoneNumber) || (!newFirstName)
    }

    async function verif_good(Password, PasswordVer) {
        axios.post(`${serverURL}/api/v1/registration`, {
            login: newLogin,
            password: newPassword,
            firstName: newFirstName,
            lastName: newLastName,
            phoneNumber: newPhoneNumber
        }).then(() => {
            dispatch(showNotification({
                message: 'Вы успешно зарегистрировались',
                severity: 'success'
            }))
            history.push('/login_page')
        }, (response) => {
            if (response.data && response.data.code && response.data.code === 23505) {
                dispatch(showNotification({
                    message: 'Данный логин уже занят',
                    severity: 'error'
                }))
            }else if(response.data && response.data.details){
                dispatch(showNotification({
                    message: `Не верные данные в поле ${response.data.details[0].context.key}`,
                    severity: 'error'
                }))
            } else {
                showNotification({
                    message: `Какая-то непонятная ошибка сервера. Сообщите об этом администратору.`,
                    severity: 'error'
                })
            }
        });
    }
    return (
        <div className="About">
            <h1>Страница регистрации</h1>
     <Box
         component="form"
         sx={{
             '& .MuiTextField-root': { m: 1, width: '25ch' },
         }}
         noValidate
         autoComplete="off"
     >
            <Input required type='login' label={'Логин'} value={newLogin} onChange={(val) => setNewLogin((val))}></Input>
            <Input required type='string' label={'имя'} value={newFirstName} onChange={(val) => setNewFirstName((val))}></Input>
            <Input type='string' label={'фамилия'} value={newLastName}
                   onChange={(val) => setNewLastName((val))}></Input>
            <Input required type='string' label={'номер телефона'} value={newPhoneNumber}
                   onChange={(val) => setNewPhoneNumber((val))}></Input>
            <Input required type='password' label={'пароль'} value={newPassword}
                   onChange={(val) => setNewPassword((val))}></Input>
            <Input required type='password' label={'подтверждение пароля'} value={newPasswordVer}
                   onChange={(val) => setNewPasswordVer((val))}></Input>

            <Button required disabled={verification()} value={'Регистрация'} onClick={() => verif_good()}></Button>

     </Box>
        </div>
    )
}

export default Registration_page