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



// function postData(firstName, SecondName){
//     axios.post('/user', {
//         firstName: ,
//         lastName: ''
//     })
//         .tahen(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
// function deleteData(){
//
// }




function Coordinators() {
    let location = useLocation()
    let history = useHistory()
    let match = useRouteMatch()

    const idksomevar = [{label: 'это лейбл 1', value:'value1'}, {label: 'это лейбл 2', value:'value2'}]

    useEffect(() => {
        axios.get('example.com')
            .then(function (idksomevar) {
              // setOptionsVal(response)
                setOptionsVal(idksomevar)
            })
            .catch(function (error) {
               console.log('error occured')
            })
            .then(function () {
                // always executed
            });
    });


    const [selectVal, setSelectVal] = useState('')
    const [optionsVal, setOptionsVal] = useState([])
    let searchers = []

    return (
        <div className="?????????????????????????????????????">
            <h1> Координаторы поиска [bgn'x[skgb </h1>
            <div>
                <Select
                    label={'Select Form'}
                    value={selectVal}
                    options={optionsVal}
                    onChange={(val)=>{setSelectVal(val)}}/>
                <Button
                    onClick = {(selectVar) => searchers.push(selectVar)}
                    value={"Add"}
                >
                    Добавить
                </Button>
            </div>
        </div>
    );
}

export default Coordinators;