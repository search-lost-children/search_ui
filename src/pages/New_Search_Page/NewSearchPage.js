import React, {useEffect, useState} from 'react';
import './NewSearchPage.css';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';
import Input from "../../components/input/input";
import TextArea from "../../components/textarea/textarea";
import GridTable from "@nadavshaar/react-grid-table";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Button from "../../components/button/button";
import {useHistory, useRouteMatch} from "react-router-dom";
import axios from "axios";
import {serverURL} from "../../config";
import MapInModal from "./MapInModal";
import Username from "../../components/tableCells/Username";
import NewEventModal from "../../components/event/NewEventModal";

function NewSearchPage() {
    const [rows, setData] = useState([]);
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [date, setDate] = useState();
    const [coordinates, setCoordinates] = useState();
    const [address, setAddress] = useState('');
    const [info, setInfo] = useState();
    const [photo, setPhoto] = useState();
    const history = useHistory();
    const isNew = useRouteMatch('/searches/new');
    const match = useRouteMatch();
    const id = match.params.id;

    function fetchData() {
        axios.get(`${serverURL}/api/v1/searches/${id}/events`).then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            console.log('error')
        }).then(function () {
            // always executed
        })

        axios.get(`${serverURL}/api/v1/searches/${id}`).then(function (response) {
            setFName(response.data.firstName);
            setLName(response.data.lastName);
            setCoordinates({lat : response.data.coordsLat, lng: response.data.coordsLng});
            setDate(response.data.date);
            setAddress(response.data.address);
            setInfo(response.data.info);
            setPhoto(response.data.photo);
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
        return fetchData();
    }, [id]);

    function getTable() {
        if (isNew) {
            return null
        }
        return (<div>
            <NewEventModal onSave={fetchData} searchId={id} isNew={isNew} />
            <div className={'table'}>
                <GridTable width="max-content" columns={columns} rows={rows}></GridTable>
            </div>
        </div>)
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
        setCoordinates(coords)
        setAddress(JSON.stringify(coords))
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
                <div className={'date'}>
                    <Input shrink type="datetime-local" label={"Дата пропажи"} onChange={(date) => {
                        setDate(date)
                    }}></Input>
                </div>
                <div className={'place'}>
                    <Input value={address} type="coordinates" label={"Точка сбора"} onChange={(addressToSave) => {
                        setAddress(addressToSave)
                    }}></Input>
                    <div className={'map_small'}>
                        <MapInModal onApply={onMapApply}></MapInModal>
                    </div>
                </div>
                <div className={"info"}>
                <TextArea type='info' label={"Вводная информация"} onChange={(info) => {
                    setInfo(info)
                }}></TextArea>
                </div>
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
                        return axios.post(`${serverURL}/api/v1/searches/`, {
                            "firstName": firstName,
                            "lastName": lastName,
                            "date": date,
                            "coordinates":  {'latitude': coordinates.lat, 'longitude': coordinates.lng},
                            "address": address,
                            "info": info,
                            "photo": photo
                        })
                        .then(function (resp) {
                            history.push(`/searches/${resp.data.id}/edit`);
                        })
                        .catch(function (error) {

                        });
                    }
                    return axios.put(`${serverURL}/api/v1/searches/${id}`, {
                        "firstName": firstName,
                        "lastName": lastName,
                        "date": date,
                        "coordinates":  {'latitude': coordinates.lat, 'longitude': coordinates.lng},
                        "address": address,
                        "info": info,
                        "photo": photo
                    })
                }}></Button>
            </div>
        </div>
    )
}

export default NewSearchPage;