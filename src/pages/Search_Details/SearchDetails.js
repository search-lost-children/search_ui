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

    useEffect(() => {
        let timerId = setInterval(function () {
            axios.get(`/searches/${id}/coordinates/`)
                .then(function (response) {
                    setData(response.data)
                })
        }, 60000)
        return (function () {
            clearInterval(timerId)
        })
    });

    function Actions(close) {
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
                    <Map />
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