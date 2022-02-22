import {serverURL} from "../config";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouteMatch} from "react-router-dom";
import TaskInfo from "../components/taskInfo/taskInfo";
import Map from "../components/map/Map"
import {showNotification} from "../features/notificationSlice";
import {useDispatch} from "react-redux";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import MapIcon from "@mui/icons-material/Map";
import Button from "../components/button/button";

function Coordinates() {
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const id = match.params.id
    const [lostInfo, setLostInfo] = useState({})
    const [tasksList, setTasksList] = useState([])
    const [myCoordinates,setMyCoordinates] = useState([])
    const [lastMyCoordinate, setLastMyCoordinate] = useState(undefined)

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
                setLastMyCoordinate( {
                    lng: longitude,
                    lat: latitude,
                    time: new Date()
                })
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

        return coordinatesSendingInterval
    }

    useEffect(() => {
        if(!lastMyCoordinate) return
        setMyCoordinates([...myCoordinates, lastMyCoordinate])
    }, [lastMyCoordinate])

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/`)
            .then(function (response) {
                setLostInfo(response.data)
            })
            .catch(function (error) {
                dispatch(showNotification({
                    message: 'При загрузке данных произошла ошибка',
                    severity: 'error'
                }))
            })
        axios.get(`${serverURL}/api/v1/searches/${id}/tasks`)
            .then(function (response) {
                setTasksList(response.data.map(el => ({
                    ...el,
                    selected: false
                })))
            })
            .catch(function (error) {
                dispatch(showNotification({
                    message: 'При загрузке данных произошла ошибка',
                    severity: 'error'
                }))
            })
        axios.get(`${serverURL}/api/v1/searches/${id}/coordinates/me`)
            .then(function (response) {
                setMyCoordinates(response.data.sort((a, b) => new Date(a.time) - new Date(b.time)))
            })
            .catch(function (error) {
                dispatch(showNotification({
                    message: 'При загрузке данных произошла ошибка',
                    severity: 'error'
                }))
            })
        const interval = startSendingCoordinates()
        return () => {
            clearInterval(interval)
        }
    }, [match.params.id]);

    function onTaskSelect (taskId, selected) {
        const item = tasksList.find(el => el.id === taskId);
        item.selected = selected;

        setTasksList([...tasksList])
    }

    function tasksTable(){
        let tasksListToRender = [];
        for (let i = 0; i < tasksList.length; i++) {
            tasksListToRender.push(
                <TaskInfo
                    onChange={onTaskSelect}
                    key={tasksList[i].id}
                    id={tasksList[i].id}
                    label={tasksList[i].label}
                    type={tasksList[i].taskType}
                    coordinates={tasksList[i].coordinates} />
            )
        }
        return tasksListToRender
    }

    const mapProps = {
        pathes: [myCoordinates],
        square: [],
        markers: []
    }

    tasksList.filter(task => task.selected).forEach((task) => {
        if (task.locationType === 'square') {
            mapProps.square.push(JSON.parse(task.location))
        } else {
            mapProps.pathes.push(JSON.parse(task.location))
        }
    })

    if (myCoordinates.length) {
        mapProps.markers.push(myCoordinates[myCoordinates.length - 1])
    }

    function Actions ({close}) {
        return (<div>
            <Button onClick={() => {
                close()
            }} value={'Закрыть'}></Button>
        </div>)
    }

    return (
        <div className={'tableCells'}>
            <h1> Имя, фамилия пропавшего: {lostInfo.firstName + " " + lostInfo.lastName} </h1>
            <div className={'elements'}>
                <Accordion sx={{ width: '100%', flexShrink: 0 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel2a-header"
                    >
                        <Typography>Информация о пропавшем</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <img className={'img'} src={lostInfo.photo} />
                        </div>
                        <div>
                            <p>
                                Дата пропажи: {moment(lostInfo.date).format('DD.MM.YYY hh:mm')}
                            </p>
                            Вводная информация: {lostInfo.info}
                        </div>
                        <div>
                            Точка сбора:
                            <div>
                                <ModalWindow
                                    trigger={<div style={{cursor:"pointer"}}>Открыть карту <MapIcon ></MapIcon> </div>}
                                    title={'Точка сбора'}
                                    actions={Actions}
                                >
                                    <div style={{height: '50vh', width:'50vw'}}>
                                        <Map markers={[{lat: lostInfo.coordLat, lng: lostInfo.coordLong}]} dim={{height: '50vh', width:'50vw'}}/>
                                    </div>

                                </ModalWindow>
                            </div>
                            <div>
                                <a href={`http://maps.google.com/?q=@${lostInfo.coordLat},${lostInfo.coordLong}`}>Открыть навигатор</a>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ width: '100%', flexShrink: 0 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Задачи</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {tasksTable()}
                    </AccordionDetails>
                </Accordion>
            </div>
            <center>
                <div className={'map'}>
                    <Map dim={{height:'100%', width:'100%'}} {...mapProps} />
                </div>
            </center>
        </div>
    )
}

export default Coordinates




