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
    const [selectVal, setSelectVal] = useState('')
    const [lostName, setLostName] = useState('')
    const [tableRows, setTableRows] = useState([])
    const [participantsVal, setParticipantsVal] = useState([])
    const [coordinatorsVal, setCoordinatorsVal] = useState([])

    function getCoordinators(){
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
    }

    const Username = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
                {data.firstName} {data.lastName}
            </div>
        )
    }

    const deleteButton = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <Button
                    onClick={() => {
                        axios.delete(`http://localhost:3000/api/v1/searches/:id/coordinators/${data.id}`)
                        .then(function (response) {
                            getCoordinators()
                        })
                        .catch(function (error) {

                        })
                        .then(function () {
                            // always executed
                        });}}
                    value = {"Удалить"}
                >
                </Button>
            </div>
        )
    }


    let idksomevar = [
        {id: '777', firstName: 'James', lastName:'Raynor'},
        {id: '122', firstName: 'Sara', lastName:'Kerrigan'}]
    let idksomevar1 = [
        {id: '777', firstName: 'James', lastName:'Raynor'},
        {id: '122', firstName: 'Sara', lastName:'Kerrigan'},
        {id: '364', firstName: 'Tychus', lastName:'Findly'}]
    let lostNNName = "Terra Nova"
    const columns = [
        {
            id: 1,
            field: 'username',
            label: 'Username',
            cellRenderer: Username,
        },
        {
            id: 2,
            field: 'action',
            label: 'Action',
            cellRenderer: deleteButton
        },
    ];
    const rows = [
        {
            id: 2154,
            firstName: "Some",
            lastName: "Name"
        },
        {
            id: 2356,
            firstName: "rghk",
            lastName: "ghfjg"
        },
        {
            id: 4578,
            firstName: "fghjgfj",
            lastName: "fghjfhjf"
        }
    ];

    function postData(firstName, SecondName){
        axios.post('/api/v1/searches/:id/coordinators', {

        })
            .tahen(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });}

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/searches/:id/participants')
            .then(function (response) {
                // setParticipantsVal(response.data)
                setParticipantsVal(idksomevar1)
            })
            .catch(function (error) {
                setParticipantsVal(idksomevar1)
            })
            .then(function () {
                // always executed
            });
        getCoordinators()
        axios.get('http://localhost:3000/api/v1/searches/:id/')
            .then(function (response) {
                //  setCoordinatorsVal(response.data)
                setLostName(lostNNName)
            })
            .catch(function (error) {
                setLostName(lostNNName)

            })
            .then(function () {
                // always executed
            });
        axios.get('http://localhost:3000/api/v1/searches/:id/tableRows')
            .then(function (response) {
                //  setCoordinatorsVal(response.data)
                setTableRows(rows)
            })
            .catch(function (error) {
                setTableRows(rows)

            })
            .then(function () {
                // always executed
            });
    }, [match.params.id]);
    useEffect(() => {

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
            label: el.lastName + " " + el.firstName
        }))
    }

    let selectOptions = filtering()
    debugger
    return (
        <div className="?????????????????????????????????????">
            <h1> Координаторы поиска {lostName} </h1>
            <div>
                <Select
                    label={'Select Form'}
                    value={selectVal}
                    options={selectOptions}
                    onChange={(val)=>{setSelectVal(val)}}/>
                <Button
                    onClick = {() => {
                        axios.post('http://localhost:3000/api/v1/searches/:id/coordinators', {
                            id: selectVal
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}


                    value={"Add"}>
                </Button>
                <GridTable columns={columns} rows={tableRows}></GridTable>
            </div>
        </div>
    );
}

export default Coordinators;