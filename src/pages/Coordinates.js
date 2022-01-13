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
    }, [match.params.id]);


    function tasksTable(){
        let tasksList = []
        for (let i = 0; i < taskList.length; i++) {
            tasksList.push()
        }
    }


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
}
