import {serverURL} from "../config";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouteMatch} from "react-router-dom";
import TaskString from "../components/taskString/taskString";


function Coordinates() {
    let match = useRouteMatch()
    const id = match.params.id
    const [lostName, setLostName] = useState({})
    const [tasksList, setTasksList] = useState([])
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    function startSendingCoordinates() {
        let coordinatesSendingInterval = setInterval(function (){
            function success(position) {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)

                axios.post(`${serverURL}/api/v1/searches/${id}/coordinates/me`, [
                    latitude, longitude
                ])
                    .then(function (response) {
                        console.log("Данные о местонахождении были отправлены на сервер для дальнейшего построения пройденого Вами маршрута")
                    })
                    .catch(function (error) {
                        console.error("Произошла ошибка при попытке отправить данные на сервер")
                    });
            }
            function error() {
                console.error('Невозможно получить ваше местоположение')
            }
            if (!navigator.geolocation) {
                console.error('Geolocation не поддерживается вашим устройством/браузером')
            } else {
                navigator.geolocation.getCurrentPosition(success, error);}}, 60000)
    }


    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/`)
            .then(function (response) {
                setLostName(response.data)
            })
            .catch(function (error) {
            })
        axios.get(`${serverURL}/api/v1/searches/${id}/tasks`)
            .then(function (response) {
                setTasksList(response.data)
            })
            .catch(function (error) {
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




