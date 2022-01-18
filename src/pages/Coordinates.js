import {serverURL} from "../../../../Coordinators/search_ui/src/config";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import Select from "../../../../Coordinators/search_ui/src/components/select/select";
import Button from "../../../../Coordinators/search_ui/src/components/button/button";



function Coordinates() {
    let location = useLocation()
    let history = useHistory()
    let match = useRouteMatch()
    const [lostName, setLostName] = useState({})
    const [coordinates, setCoordinates] = useState([])
    const [taskList, setTaskList] = useState([])
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/`)
            .then(function (response) {
                setLostName(response.data)
            })
            .catch(function (error) {

            })
        axios.get(`${serverURL}/api/v1/searches/${id}/coordinates`)
            .then(function (response) {
                setCoordinates(response.data)
            })
            .catch(function (error) {

            })
        axios.get(`${serverURL}/api/v1/searches/${id}/tasks`)
            .then(function (response) {
                setTaskList(response.data)
            })
            .catch(function (error) {

            })
        let timerId = setInterval(function (){
            function success(position) {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)

                axios.post(`${serverURL}/api/v1/searches/${id}/me`, [
                    latitude, longitude
                ])
                    .then(function (response) {

                    })
                    .catch(function (error) {
                        console.error("Братан, данные не отправились")
                    });
            }
            function error() {
                console.error('Невозможно получить ваше местоположение')
            }

            if (!navigator.geolocation) {
                console.error('Geolocation не поддерживается вашим устройством/браузером')
            } else {
                navigator.geolocation.getCurrentPosition(success, error);}}, 60000)
    }, [match.params.id]);


    function tasksTable(){
        let tasksList = []
        for (let i = 0; i < taskList.length; i++) {
            tasksList.push()
        }
    }

    function DDOS(){
        let timerId = setInterval(function (){
            function success(position) {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)

                axios.post(`${serverURL}/api/v1/searches/${id}/coordinators`, [
                    latitude, longitude
                ])
                    .then(function (response) {

                    })
                    .catch(function (error) {

                    });
                clearInterval(timerId)
            }
            function error() {
                console.error('Невозможно получить ваше местоположение')
            }

            if (!navigator.geolocation) {
                console.error('Geolocation не поддерживается вашим устройством/браузером')
            } else {
                navigator.geolocation.getCurrentPosition(success, error);}}, 60000)




    return (
        <div>
            <h1> Имя, фамилия пропавшего: {lostName.firstName + " " + lostName.lastName} </h1>
            <div>{tasksTable()}</div>
            {/*<div>MAP</div>*/}
            <div>
                <Button
                    onClick = {() => {
                        axios.post(`${serverURL}/api/v1/searches/${id}/coordinates`)
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                    value={"Отправить координаты"}>
                </Button>
            </div>
        </div>
    );
}}
