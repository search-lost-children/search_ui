import React from "react";
import {useEffect} from "react";
import {useState} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route, useLocation, useHistory, useRouteMatch
} from "react-router-dom";
import DocumentationPage from "./documentation/Documentation";
import Select from "../components/select/select";
import Button from "../components/button/button";
import * as axios from "axios";
import GridTable from "@nadavshaar/react-grid-table";


function Coordinators() {
    let location = useLocation()
    let history = useHistory()
    let match = useRouteMatch()
    debugger
    const [selectVal, setSelectVal] = useState('')
    const [participantsVal, setParticipantsVal] = useState([])
    const [coordinatorsVal, setCoordinatorsVal] = useState([])
    let idksomevar = [
        {id: '777', firstName: 'James', lastName:'Raynor'},
        {id: '122', firstName: 'Sara', lastName:'Kerrigan'}]

    function postData(firstName, SecondName){
        axios.post('/api/v1/searches/:id/coordinators', {

        })
            .tahen(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
}
function deleteData(){

}


    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/searches/:id/participants')
            .then(function (response) {
                // setParticipantsVal(response.data)
            })
            .catch(function (error) {
                setCoordinatorsVal(idksomevar)
            })
            .then(function () {
                // always executed
            });
    }, [match.params.id]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/searches/:id/coordinators')
            .then(function (response) {
                //  setCoordinatorsVal(response.data)
                setCoordinatorsVal(idksomevar)
            })
            .catch(function (error) {
                setCoordinatorsVal(idksomevar)
            })
            .then(function () {
                // always executed
            });
    }, [match.params.id]);

    function filtering() {
        let sortedListOfParticipants = []
        for (let i = 0; i < participantsVal.length; i++) {
            if (!coordinatorsVal.find((el) => el.id === participantsVal[i].id)) {
                sortedListOfParticipants.push(participantsVal[i])
            }
        }
        return sortedListOfParticipants.map((el) => ({
            value: el.id,
            label: el.lastName
        }))
    }


    let selectOptions = filtering()

    return (
        <div className="?????????????????????????????????????">
            <h1> Координаторы поиска ?????????? </h1>
            <div>
                <Select
                    label={'Select Form'}
                    value={selectVal}
                    options={selectOptions}
                    onChange={(val)=>{setSelectVal(val)}}/>
                <Button
                    // onClick = {(selectVar) => .push(selectVar)}

                    value={"Add"}
                >
                    Добавить
                </Button>
            </div>
        </div>
    );
}

export default Coordinators;