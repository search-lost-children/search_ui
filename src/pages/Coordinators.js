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
    const [lostName, setLostName] = useState({})
    const [tableRows, setTableRows] = useState([])
    const [participantsVal, setParticipantsVal] = useState([])
    const [coordinatorsVal, setCoordinatorsVal] = useState([])

    const id = match.params.id

    function getCoordinators(){
        axios.get(`http://localhost:3000/api/v1/searches/${id}/coordinators`)
            .then(function (response) {
                setCoordinatorsVal(response.data)
            })
            .catch(function (error) {

            })}

    const Username = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
                {data.firstName} {data.lastName}
            </div>
        )
    }

    const DeleteButton = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <Button
                    onClick={() => {
                        axios.delete(`http://localhost:3000/api/v1/searches/${id}/coordinators/${data.id}`)
                        .then(function (response) {
                            getCoordinators()
                        })
                        .catch(function (error) {
                        })}}
                    value = {"Удалить"}
                >
                </Button>
            </div>
        )
    }
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
            cellRenderer: DeleteButton
        },
    ];

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/searches/${id}/participants`)
            .then(function (response) {
                // setParticipantsVal(response.data)
                setParticipantsVal(response.data)
            })
            .catch(function (error) {

            })
        getCoordinators()
        axios.get(`http://localhost:3000/api/v1/searches/${id}/`)
            .then(function (response) {
                //  setCoordinatorsVal(response.data)
                setLostName(response.data)
            })
            .catch(function (error) {

            })
        axios.get(`http://localhost:3000/api/v1/searches/${id}/coordinators`)
            .then(function (response) {
                //  setCoordinatorsVal(response.data)
                setTableRows(response.data)
            })
            .catch(function (error) {

            })
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
    return (
        <div>
            <h1> Координаторы поиска {lostName.firstName + " " + lostName.lastName} </h1>
            <div>
                <Select
                    label={'Select Form'}
                    value={selectVal}
                    options={selectOptions}
                    onChange={(val)=>{setSelectVal(val)}}/>
                <Button
                    onClick = {() => {
                        axios.post(`http://localhost:3000/api/v1/searches/${id}/coordinators`, {
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