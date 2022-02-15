import {serverURL} from "../config";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouteMatch} from "react-router-dom";
import TaskString from "../components/taskString/taskString";
import Map from "../components/map/Map"
import Marker from "../components/map/Marker"
import tableCells from './Coordinates.css'

function Coordinates() {
    let match = useRouteMatch()
    let tmp
    const id = match.params.id
    const [lostName, setLostName] = useState({})
    const [tasksList, setTasksList] = useState([])
    const [radioVal, setRadioVal] = useState()
    const [myCoordinates,setMyCoordinates] = useState()
    const [coordinatesArray, setCoordinatesArray] = useState([])
    //const [latitude, setLatitude] = useState(0)
    //const [longitude, setLongitude] = useState(0)

    function startSendingCoordinates() {
        let coordinatesSendingInterval = setInterval(function (){
            function success(position) {
                //setLatitude(position.coords.latitude)
                //setLongitude(position.coords.longitude)
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                axios.post(`${serverURL}/api/v1/searches/${id}/coordinates/me`, {
                    latitude: latitude,
                    longitude: longitude
                })
                    .then(function (response) {
                        console.log("Данные о местонахождении были отправлены на сервер для дальнейшего построения пройденого Вами маршрута")
                    })
                    .catch(function (error) {
                        console.error("Произошла ошибка при попытке отправить данные на сервер")
                    });
                tmp = [...coordinatesArray, {
                    lng: longitude,
                    lat: latitude,
                    time: new Date()
                }]
                setCoordinatesArray(tmp)
            }
            function error() {
                console.error('Невозможно получить ваше местоположение')
            }
            if (!navigator.geolocation) {
                console.error('Geolocation не поддерживается вашим устройством/браузером')
            } else {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        }, 60000)
    }

    let test = [{
        label: "Task1",
        type: "solo",
        coordinates: [0.1111111, 0.77777777],
        status: "open"
    }, {
        label: "Task2",
        type: "group",
        coordinates: [0.1111111, 0.77777777],
        status: "open"
    }]

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/`)
            .then(function (response) {
                setLostName(response.data)
            })
            .catch(function (error) {
            })
        axios.get(`${serverURL}/api/v1/searches/${id}/tasks`)
            .then(function (response) {
                // setTasksList(response.data)
                setTasksList(test)
            })
            .catch(function (error) {
            })
        axios.get(`${serverURL}/api/v1/searches/${id}/coordinates/me`)
            .then(function (response) {
                setCoordinatesArray(response.data)
            })
            .catch(function (error) {
                setTasksList(test)
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
            {/*<div>MAP</div>*/}
        </div>
    )}

export default Coordinates




