import Button from "../../../../../Coordinators/search_ui/src/components/button/button";
import {useState} from "react";
import {serverURL} from "../../../../../Coordinators/search_ui/src/config";
import tableCells from './Coordinates.css'
import axios from "axios";

function taskString(taskLabel, taskType, mapCoordinates) {
    let color
    let taskTypeLabel
    const [buttonStatus, setButtonStatus] = useState(false)
    const [buttonValue, setButtonValue] = useState("Начать")
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

    if (taskType === "solo") {
        let color = "aqua"
        let taskTypeLabel = "Индивидуальное"
    } else {
        let color = "green"
        let taskTypeLabel = "Групповое"
    }

    return (
        <div>
            <div className={tableCells}>{taskLabel}</div>
            <div className={tableCells}><font color={color}>{taskTypeLabel}</font></div>
            <div className={tableCells}>
                <Button
                    onClick = {() => {
                        // coordsToTheMap(mapCoordinates[0], mapCoordinates[1]) ?????????????????????????????????????????????????
                        setButtonValue("В процессе...")
                        startSendingCoordinates()
                        setButtonStatus(true)
                    }}
                    value={buttonValue}
                    disabled={buttonStatus}>
                </Button>
            </div>
        </div>)
}


export default taskString