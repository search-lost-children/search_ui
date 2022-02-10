import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {
    useLocation, useHistory, useRouteMatch
} from "react-router-dom";
import Select from "../components/select/select";
import Button from "../components/button/button";
import * as axios from "axios";
import GridTable from "@nadavshaar/react-grid-table";
import {serverURL} from "../config";
import Username from "../components/tableCells/Username";

function Coordinators() {
    let match = useRouteMatch()
    const [selectVal, setSelectVal] = useState('')
    const [lostName, setLostName] = useState({})
    const [tableRows, setTableRows] = useState([])
    const [participants, setParticipants] = useState([])
    const [coordinators, setCoordinators] = useState([])

    const id = match.params.id

    function getCoordinators(){
        axios.get(`${serverURL}/api/v1/searches/${id}/coordinators`)
            .then(function (response) {
                 setCoordinators(response.data)
            })
    }

    const DeleteButton = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <Button
                    onClick={() => {
                        axios.delete(`${serverURL}/api/v1/searches/${id}/coordinators/${data.id}`)
                        .then(function (response) {
                            getCoordinators()
                        })
                    }}
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
        axios.get(`${serverURL}/api/v1/searches/${id}/participants`)
            .then(function (response) {
                setParticipants(response.data)
            })
        getCoordinators()
    }, [match.params.id]);

    function filtering() {
        let sortedListOfParticipants = []
        for (let i = 0; i < participants.length; i++) {
            if (!coordinators.find((el) => el.id === participants[i].id)) {
                sortedListOfParticipants.push(participants[i])
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
                        axios.post(`${serverURL}/api/v1/searches/${id}/coordinators`, {
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