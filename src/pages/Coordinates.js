import {serverURL} from "../../../../Coordinators/search_ui/src/config";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import taskString from "../components/taskString for taskTable/taskString";



function Coordinates() {
    let location = useLocation()
    let history = useHistory()
    let match = useRouteMatch()
    const [lostName, setLostName] = useState({})
    const [tasksList, setTasksList] = useState([])

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
    }, [match.params.id]);



    function tasksTable(){
        let tasksListToRender = []
        for (let i = 0; i < tasksList.length; i++) {
            if(tasksList[i].status === "open"){
                tasksListToRender.push(taskString(tasksList[i].label, tasksList[i].type, tasksList[i].coordinates))
            }
        }
        return tasksListToRender
    }

    function coordsToTheMap() {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }


    return (
        <div>
            <h1> Имя, фамилия пропавшего: {lostName.firstName + " " + lostName.lastName} </h1>
            <div>{tasksTable()}</div>
            {/*<div>MAP</div>*/}
        </div>
    )}






