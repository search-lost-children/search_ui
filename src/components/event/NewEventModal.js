import ModalWindow from "../ModalWindow/ModalWindow";
import IconButton from "@mui/material/IconButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Select from "../select/select";
import Input from "../input/input";
import TextField from "../textarea/textarea";
import React, {useState} from "react";
import Button from "../button/button";
import axios from "axios";
import {serverURL} from "../../config";

export default function NewEventModal ({isNew, searchId, onSave}) {
    const [priority, setPriority] = useState();
    const [time, setTime] = useState();
    const [description, setDescription] = useState();

    function Actions({close}) {
        return (<div className={'save'}>
            <Button value={'Сохранить'} onClick={() => {
                axios.post(`${serverURL}/api/v1/searches/${searchId}/events`, {
                    "priority": priority,
                    "time": new Date(time),
                    "description": description,
                })
                .then(function (resp) {
                    close()
                }).catch(function (error) {
                    console.log(error);
                }).then(function () {
                    onSave()
                })
            }}></Button>

            <Button value={'Отменить'} onClick={() => {
                close();
            }}></Button>
        </div>)
    }

    return (
        <div className={'event'}>
            События
            <ModalWindow
                trigger={<IconButton disabled={isNew} aria-label="add">
                    <AddCircleOutline/>
                </IconButton>}
                title={'Добавить событие'}
                actions={Actions}
            >
                <div className={'field'}>
                    <p>Назначте приоритет заданию</p>
                    <Select label={'Приоритет'}
                            options={[{label: '', value: ''},
                                {label: '1', value: '1'},
                                {label: '2', value: '2'},
                                {label: '3', value: '3'}
                            ]}
                            onChange={(priority) => {
                                setPriority(priority)
                            }}
                    />

                    <p>Дата и время поиска</p>
                    <Input shrink type="datetime-local" label={'Дата и время'} onChange={(time) => {
                        setTime(time)
                    }} />
                    <p>Введите основные детали, примечания</p>
                    <TextField style={{width: '100%'}} type="description" label={'Описание'}
                               onChange={(description) => {
                                   setDescription(description)
                               }} />
                </div>
            </ModalWindow>

        </div>
    )
}