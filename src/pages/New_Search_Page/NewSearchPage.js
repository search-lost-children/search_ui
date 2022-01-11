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

function NewSearchPage() {

    const [rows, setData] = useState([]);
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [place, setPlace] = useState();
    const [text, setText] = useState();
    const [priority, setPriority] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [author, setAuthor] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const history = useHistory();
    const isNew = useRouteMatch('/searches/new');
    const match = useRouteMatch();
    const id = match.params.id;

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/new`).then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            console.log('error')
        }).then(function () {
            // always executed
        });
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
                        <p>Время поиска</p>
                        <Input type="date" label={'Дата'} onChange={(date) => {
                            setDate(date)
                        }}></Input>
                        <Input type="time" label={'Время'} onChange={(time) => {
                            setTime(time)
                        }}></Input>
                        <p>Назначте автора задания</p>
                        <Input type="author" label={'Автор'} onChange={(author) => {
                            setAuthor(author)
                        }}></Input>
                        <p>Выберите тип задания: информативный либо ...</p>
                        <Input type="type" label={'Тип'} onChange={(type) => {
                            setType(type)
                        }}></Input>
                        <p>Введите описание: "видели"</p>
                        <Input type="description" label={'Описание'} onChange={(description) => {
                            setDescription(description)
                        }}></Input>
                    </div>
                </ModalWindow>


            </div>
            <div className={'table'}>
                <GridTable width="max-content" columns={columns} rows={rows}></GridTable>
            </div>
        </div>)
    }

    function Actions(close) {
        return (<div className={'save'}>
            <Button value={'Сохранить'} onClick={() => {
                axios.post(`${serverURL}/api/v1/searches/${id}/new_event`, {
                    "priority": priority,
                    "date": date,
                    "time": time,
                    "author": author,
                    "type": type,
                    "description": description
                })
                    .then(function (resp) {
                       close()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
            field: 'type',
            label: 'Тип',
        },
        {
            id: 5,
            field: 'description',
            label: 'Описание',
        },
        {
            id: 6,
            field: ' ',
            label: 'Действие',
            cellRenderer: Do
        }
    ];

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
                    <div className={'map_small'}></div>
                </div>
                <TextArea type='text' label={"Вводная информация"} onChange={(text) => {
                    setText(text)
                }}></TextArea>

            </div>

            {getTable()}

            <div className={'buttonStart'}>
                <Button value={'Начать'} onClick={() => {
                    axios.post(`${serverURL}/api/v1/searches/new`, {
                        "first name": firstName,
                        "last name": lastName,
                        "place": place,
                        "text": text
                    })
                        .then(function (resp) {
                            history.push(`/searches/${resp.data.id}/edit`);
                        })
                        .catch(function (error) {
                            history.push(`/searches/1/edit`);
                            console.log(error);
                        });
                }}></Button>
            </div>
        </div>
    )
}

export default NewSearchPage;