import {serverURL} from "../config";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouteMatch} from "react-router-dom";
import TaskString from "../components/taskString/taskString";
import Map from "../components/map/Map"
import Marker from "../components/map/Marker"
import tableCells from './Coordinates.css'
import {showNotification} from "../features/notificationSlice";
import {useDispatch} from "react-redux";

function Coordinates() {
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const id = match.params.id
    const [lostName, setLostName] = useState({})
    const [tasksList, setTasksList] = useState([])
    const [radioVal, setRadioVal] = useState()
    const [myCoordinates,setMyCoordinates] = useState([])

    function startSendingCoordinates() {
        let coordinatesSendingInterval = setInterval(function (){
            function success(position) {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                axios.post(`${serverURL}/api/v1/searches/${id}/coordinates/me`, {
                    latitude: latitude,
                    longitude: longitude
                }).catch(function (error) {
                    dispatch(showNotification({
                        message: 'При загрузке данных произошла ошибка.',
                        severity: 'error'
                    }))
                });
                setMyCoordinates([...myCoordinates, {
                    lng: longitude,
                    lat: latitude,
                    time: new Date()
                }])
            }
            function error() {
                dispatch(showNotification({
                    message: 'Геолокация не поддерживается Вашим устройством. \n Включите геолокацию и обновите страницу.',
                    severity: 'error'
                }))
            }
            if (!navigator.geolocation) {
                dispatch(showNotification({
                    message: 'Геолокация не поддерживается Вашим устройством. \n Включите геолокацию и обновите страницу.',
                    severity: 'error'
                }))
            } else {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        }, 60000)
    }

    useEffect(() => {
        let test = [
            {
                label: "Task1",
                type: "solo",
                coordinates: [77777, 77777],
                status: "open"
            },
            {
                label: "Task2",
                type: "group",
                coordinates: [77777, 77777],
                status: "closed"
            },
            {
                label: "Task3",
                type: "group",
                coordinates: [77777, 77777],
                status: "open"
            }
        ]
        setTasksList(test)
    },[match.params.id])

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/`)
            .then(function (response) {
                setLostName(response.data)
            })
            .catch(function (error) {
                dispatch(showNotification({
                    message: 'При загрузке данных произошла ошибка',
                    severity: 'error'
                }))
            })
        axios.get(`${serverURL}/api/v1/searches/${id}/tasks`)
            .then(function (response) {
                // setTasksList(response.data)
                setTasksList(test)
            })
            .catch(function (error) {
                dispatch(showNotification({
                    message: 'При загрузке данных произошла ошибка',
                    severity: 'error'
                }))
            })
        axios.get(`${serverURL}/api/v1/searches/${id}/coordinates/me`)
            .then(function (response) {
                setMyCoordinates(response.data)
            })
            .catch(function (error) {
                dispatch(showNotification({
                    message: 'При загрузке данных произошла ошибка',
                    severity: 'error'
                }))
            })
       startSendingCoordinates()

    }, [match.params.id]);



    function tasksTable(){
        let tasksListToRender = []
        for (let i = 0; i < tasksList.length; i++) {
            if(tasksList[i].status === "open"){
                tasksListToRender.push(<TaskString label={tasksList[i].label} type={tasksList[i].type} coordinates={tasksList[i].coordinates} />)
            }
        }
        return tasksListToRender
    }

    return (
        <div className={'tableCells'}>
            <h1> Имя, фамилия пропавшего: {lostName.firstName + " " + lostName.lastName} </h1>
            <div className={'elements'}>{tasksTable()}</div>
            <center>
                <div className={'map'}>
                    <Map dim={{height:'100%', width:'100%'}}/>
                </div>
            </center>
        </div>
    )
}

export default Coordinates




