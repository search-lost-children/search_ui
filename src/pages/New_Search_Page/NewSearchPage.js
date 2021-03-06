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
import {showNotification} from "../../features/notificationSlice";
import {useDispatch} from "react-redux";
import moment from "moment";

function NewSearchPage() {
    const [rows, setData] = useState([]);
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [date, setDate] = useState(new Date());
    const [coordinates, setCoordinates] = useState();
    const [address, setAddress] = useState('');
    const [info, setInfo] = useState();
    const [photo, setPhoto] = useState();
    const history = useHistory();
    const isNew = useRouteMatch('/searches/new');
    const match = useRouteMatch();
    const id = match.params.id;
    const dispatch = useDispatch()

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
            dispatch(showNotification({
                message: '???? ?????????? ???????????????? ???????????? ?????????????????? ????????????',
                severity: 'error'
            }))
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
            label: '??????????????????',
        },
        {
            id: 2,
            field: 'time',
            label: '??????????',
        },
        {
            id: 3,
            field: 'author',
            label: '??????????',
            cellRenderer: Username
        },
        {
            id: 4,
            field: 'description',
            label: '????????????????',
        },
        {
            id: 5,
            field: ' ',
            label: '????????????????',
            cellRenderer: Do
        }
    ];

    function onMapApply(coords) {
        setCoordinates(coords)
        setAddress(JSON.stringify(coords))
    }

    return (<div className={'newSearchPage'}>
            <h1>??????: {firstName} {lastName} </h1>
            <div className={'content'}>
                <div className={'whenFind'}>
                    <Input shrink value={firstName} type="firstName" label={"??????"} onChange={(firstName) => {
                        setFName(firstName)
                    }}></Input>
                    <Input shrink value={lastName} type="lastName" label={"??????????????"} onChange={(lastName) => {
                        setLName(lastName)
                    }}></Input>
                    <IconButton aria-label="add">
                        <Search/>
                    </IconButton>
                    <p>?????????????????? ?????? ???????????? ...</p>
                </div>
                <div className={'date'}>
                    <Input shrink value={moment(date).format("yyyy-MM-DDTHH:mm")} type="datetime-local" label={"???????? ??????????????"} onChange={(date) => {
                        setDate(date)
                    }}></Input>
                </div>
                <div className={'place'}>
                    <Input shrink value={address} type="coordinates" label={"?????????? ??????????"} onChange={(addressToSave) => {
                        setAddress(addressToSave)
                    }}></Input>
                    <div className={'map_small'}>
                        <MapInModal marker={coordinates} onApply={onMapApply}></MapInModal>
                    </div>
                </div>
                <div className={"info"}>
                <TextArea shrink value={info} type='info' label={"?????????????? ????????????????????"} onChange={(info) => {
                    setInfo(info)
                }}></TextArea>
                </div>
                <div className={'photo'}>
                    <p>???????????????????? ???????? ????????????????, ???????????????? ??????????:</p>
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
                <Button value={isNew ? '????????????' : '??????????????????'} onClick={() => {
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
                            dispatch(showNotification({
                                message: '???? ?????????? ???????????????? ???????????? ?????????????????? ????????????',
                                severity: 'error'
                            }))
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