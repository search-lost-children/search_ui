import React, {useEffect, useState} from 'react';
import './NewSearchPage.css';
import IconButton from '@mui/material/IconButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import Search from '@mui/icons-material/Search';
import Input from "../../components/input/input";
import TextArea from "../../components/textarea/textarea";
import GridTable from "@nadavshaar/react-grid-table";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Button from "../../components/button/button";
import {useHistory, useRouteMatch} from "react-router-dom";
import axios from "axios";
import {serverURL} from "../../config";
import Select from "../../components/select/select";
import TextField from "../../components/textarea/textarea";
import Map from "../../components/map/Map";
import MapIcon from '@mui/icons-material/Map';
import MapInModal from "./MapInModal";

function NewSearchPage() {

    const [rows, setData] = useState([]);
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [place, setPlace] = useState();
    const [text, setText] = useState();
    const [priority, setPriority] = useState();
    const [time, setTime] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [photo, setPhoto] = useState();
    const history = useHistory();
    const isNew = useRouteMatch('/searches/new');
    const match = useRouteMatch();
    const id = match.params.id;

    function axiosGet() {
        axios.get(`${serverURL}/api/v1/searches/${id}/events`).then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            console.log('error')
        }).then(function () {
            // always executed
        })
    }

    useEffect(() => {
        if (isNew) {
            return null
        }
        return axiosGet();
    }, []);

    function getTable() {
        if (isNew) {
            return null
        }
        return (<div>
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
                        >
                        </Select>
                        <p>Дата и время поиска</p>
                        <Input shrink type="datetime-local" label={'Дата и время'} onChange={(time) => {
                            setTime(time)
                        }}></Input>
                        <p>Назначте автора задания</p>
                        <Input type="author" label={'Автор'} onChange={(author) => {
                            setAuthor(author)
                        }}></Input>
                        <p>Введите основные детали, примечания</p>
                        <TextField style={{width: '100%'}} type="description" label={'Описание'}
                                   onChange={(description) => {
                                       setDescription(description)
                                   }}></TextField>
                    </div>
                </ModalWindow>

            </div>
            <div className={'table'}>
                <GridTable width="max-content" columns={columns} rows={rows}></GridTable>
            </div>
        </div>)
    }

    function Actions({close}) {
        return (<div className={'save'}>
            <Button value={'Сохранить'} onClick={() => {
                axios.post(`${serverURL}/api/v1/searches/${id}/events`, {
                    "priority": priority,
                    "when": new Date(time),
                    "author": author,
                    "description": description,
                })
                    .then(function (resp) {
                        close()
                    }).catch(function (error) {
                    console.log(error);
                }).then(function () {
                    axiosGet()
                })
            }}></Button>

            <Button value={'Отменить'} onClick={() => {
                close();
            }}></Button>
        </div>)
    }

    const Username = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                {data.firstName} {data.lastName}
            </div>
        )
    }

    const Do = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <ModalWindow
                    trigger={<Button value={'Edit'}></Button>}
                    title={'Modal Title'}
                >
                    <div>
                        Some random text
                    </div>
                </ModalWindow>
            </div>
        )
    }

    const columns = [
        {
            id: 1,
            field: 'priority',
            label: 'Приоритет',
        },
        {
            id: 2,
            field: 'time',
            label: 'Время',
        },
        {
            id: 3,
            field: 'author',
            label: 'Автор',
            cellRenderer: Username
        },
        {
            id: 4,
            field: 'description',
            label: 'Описание',
        },
        {
            id: 5,
            field: ' ',
            label: 'Действие',
            cellRenderer: Do
        }
    ];

    function onMapApply(coords) {

    }

    return (<div className={'newSearchPage'}>
            <h1>ФИО: {firstName} {lastName} </h1>
            <div className={'content'}>
                <div className={'whenFind'}>
                    <Input type="firstName" label={"Имя"} onChange={(firstName) => {
                        setFName(firstName)
                    }}></Input>
                    <Input type="lastName" label={"Фамилия"} onChange={(lastName) => {
                        setLName(lastName)
                    }}></Input>
                    <IconButton aria-label="add">
                        <Search/>
                    </IconButton>
                    <p>Последний раз искали ...</p>
                </div>
                <div className={'place'}>
                    <Input type="place" label={"Точка сбора"} onChange={(place) => {
                        setPlace(place)
                    }}></Input>
                    <div className={'map_small'}>
                        <MapInModal onApply={onMapApply}></MapInModal>
                    </div>
                </div>
                <TextArea type='text' label={"Вводная информация"} onChange={(text) => {
                    setText(text)
                }}></TextArea>
                <div className={'photo'}>
                    <p>Прикрепите фото человека, которого ищете:</p>
                    <Input type={'file'} onChange={(photo) => {
                        const reader = new FileReader();
                        const file = photo[0];
                        reader.readAsDataURL(file);
                        reader.addEventListener('load', (event) => {
                            setPhoto(event.target.result)
                        });
                    }}></Input>
                    {photo ? <img className={'img'} src={photo} /> : null}
                </div>
            </div>

            {getTable()}

            <div className={'buttonStart'}>
                <Button value={isNew ? 'Начать' : 'Сохранить'} onClick={() => {
                    if (isNew) {
                        return axios.post(`${serverURL}/api/v1/searches/new`, {
                            "first name": firstName,
                            "last name": lastName,
                            "place": place,
                            "text": text,
                            "photo": photo
                        })
                            .then(function (resp) {
                                history.push(`/searches/${resp.data.id}/edit`);
                            })
                            .catch(function (error) {
                                history.push(`/searches/1/edit`);
                                console.log(error);
                            });
                    }
                    return axios.put(`${serverURL}/api/v1/searches/${id}`, {
                        "first name": firstName,
                        "last name": lastName,
                        "place": place,
                        "text": text,
                        "photo": photo
                    })
                }}></Button>
            </div>
        </div>
    )
}

export default NewSearchPage;