import tableCells from './taskString.css'
import Button from "../../../../../Coordinators/search_ui/src/components/button/button";
import {serverURL} from "../../../../../Coordinators/search_ui/src/config";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";


function taskString(taskLabel, taskType) {
    let color
    const [taskCoords, setTaskCoords] = useState([])

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/coords/task`)
            .then(function (response) {
                setTaskCoords(response.data)
            })
            .catch(function (error) {
                console.error("oh no, cringe")
            })


    })


    if (taskType === "solo") {
        let color = "aqua"
        let type = "Индивидуальное"
    } else {
        let color = "green"
        let type = "Групповое"
    }
    return (
        <div>
            <div className={tableCells}>   {taskLabel}   </div>
            <div className={tableCells}><font color={color}>{type}</font></div>
            <div className={tableCells}>
                <Button
                   onClick = {coordsToTheMap}
                   value={"Показать маршрут на карте"}>
            </Button>
            </div>
        </div>)
}}





