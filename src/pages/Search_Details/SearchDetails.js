import Button from "../../components/button/button";
import React, {useEffect, useState} from "react";
import CheckBox from "../../components/checkbox/checkbox";
import './SearchDetails.css';
import {useHistory, useRouteMatch} from "react-router-dom";
import axios from "axios";
import {serverURL} from "../../config";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Map from "../../components/map/Map";

function SearchDetails() {
    const history = useHistory();
    let match = useRouteMatch();
    const id = match.params.id;
    const [data, setData] = useState();
    const [people, setPeople] = useState(false);
    const [zones, setZones] = useState(false);
    const [markings, setMarkings] = useState(false);

    function createCoordinateStorageObj(id, firstName, lastName, lat, lng, time) {
        return {
            userid: id,
            firstName: firstName,
            lastName: lastName,
            coordinates: [
                {
                    lng: lng,
                    lat: lat,
                    time: time
                }]
        }
    }

    function dataStoring(data){
        let coordinatesStorage = []
        let tmp
        for(let i = 0; i < coordinatesStorage.length; i++){
            if (i === 0) {
                coordinatesStorage.push(createCoordinateStorageObj(data[1].userId, data[1].firstName, data[1].lastName, data[1].lat, data[1].lng, data[1].time))
                continue
            }
            tmp = data.find((el) => el.userId === coordinatesStorage[i].userId)
            if(i === coordinatesStorage.length - 1 && tmp === undefined){
                coordinatesStorage.push(createCoordinateStorageObj(data[1].userId, data[1].firstName, data[1].lastName, data[1].lat, data[1].lng, data[1].time))
            }
            }

        }
    }

    useEffect(() => {
        let timerId = setInterval(function () {
            axios.get(`${serverURL}/api/v1/searches/${id}/coordinates/`)
                .then(function (response) {
                    [
                        {
                            "userId": 1,
                            "firstName": "dgfdf",
                            "lastName": "dfdgf",
                            "lng": "35.0627573",
                            "lat": "48.4613372",
                            "time": "2022-02-10T18:35:46.571Z"
                        },
                        {
                            "userId": 1,
                            "firstName": "dgfdf",
                            "lastName": "dfdgf",
                            "lng": "35.0627573",
                            "lat": "48.4613372",
                            "time": "2022-02-10T18:35:48.642Z"
                        },
                        {
                            "userId": 3,
                            "firstName": "123",
                            "lastName": "123",
                            "lng": "35.0627573",
                            "lat": "48.4613372",
                            "time": "2022-02-17T18:12:37.501Z"
                        }
                    ]

                    [
                        {
                            userid: 1,
                            firstName: '',
                            lastName: '',
                            coordinates: [
                                {
                                    "lng": "35.0627573",
                                    "lat": "48.4613372",
                                    "time": "2022-02-10T18:35:46.571Z"
                                },
                                {
                                    "lng": "35.0627573",
                                    "lat": "48.4613372",
                                    "time": "2022-02-10T18:35:46.571Z"
                                }
                            ]
                        }
                    {
                        userId:2,
                            coordinates: [

                    ]
                    }
                        ]
                    setData(response.data)
                })
        }, 60000)
        return (function () {
            clearInterval(timerId)
        })
    });

    function Actions({close}) {
        return (<div className={'space'}>
            <Button value={'ДА'} color="secondary" onClick={() => {
                axios.delete(`${serverURL}/api/v1/searches/${id}`).then(() => {
                    close();
                    history.push('/searches')
                })
            }}></Button>
            <div></div>
            <Button value={'НЕТ'} onClick={() => {
                close();
            }}></Button>
        </div>)
    }

    return (<div className={'searchDetails'}>
            <h1>Поиск ФИО</h1>
            <div className={'pageDetails'}>
                <div className={'map'}>
                    <Map dim={{height:'100%', width:'100%'}}/>
                </div>
                <div className={'info'}>
                    <div className={'buttons'}>
                        <Button value={'Учасники'} onClick={() => {
                            history.push(`/searches/${id}/participants/`)
                        }}></Button>
                        <Button value={'Координаторы'} onClick={() => {
                            history.push(`/searches/${id}/coordinators/`)
                        }}></Button>
                        <Button value={'Отряды'} onClick={() => {
                            history.push(`/searches/${id}/squads/`)
                        }}></Button>
                        <Button value={'Добавить задание'} onClick={() => {
                            history.push(`/searches/${id}/new_task/`)
                        }}></Button>
                    </div>
                    <div className={'bottomBox'}>
                        <div className={'checkboxes'}>
                            <CheckBox name={'People'} checked={people} label={'Люди'} onChange={(val) => {
                                setPeople(val)
                            }}></CheckBox>
                            <CheckBox name={'Zones'} checked={zones} label={'Зоны поиска'} onChange={(val) => {
                                setZones(val)
                            }}></CheckBox>
                            <CheckBox name={'Markings'} checked={markings} label={'Пометки'} onChange={(val) => {
                                setMarkings(val)
                            }}></CheckBox>
                        </div>
                        <div className={'complete'}>
                            <ModalWindow
                                trigger={<Button value={'Завершить'}></Button>}
                                title={'Завершение поиска'}
                                actions={Actions}
                            >
                                <div>
                                    <h2 align="center">Уверенны, что хотите завершить поиск?</h2>
                                </div>
                            </ModalWindow>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchDetails;