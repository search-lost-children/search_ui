import React, {useState, useEffect}from 'react';
import { useRouteMatch } from 'react-router-dom';
import './squads.css'
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import SquadsTable from "../../components/squadsTable/squadsTable";
import axios from "axios";
import {serverURL} from "../../config";
import {DataGrid} from "@mui/x-data-grid";
import {useShowError, useShowSuccess} from "../../services/notification.service";

function SquadsSearch() {
    const [selectVal1, setSelectVal1] = useState('')
    const [selectVal2, setSelectVal2] = useState('')
    const [rows, setRows ] = useState([]);
    const [DataPart, setDataPart]= useState([]);
    const [coordinators, setCoordinators]= useState([]);
    const [squads, setSquads]= useState([]);
    const showSuccess = useShowSuccess()
    const showError = useShowError()

    let match = useRouteMatch()
    const id = match.params.id

    const columns = [
        {
            id: 1,
            field: 'ФИО',
            label: 'ФИО',
            valueGetter: (params) => {
                return `${params.row.firstName} ${params.row.lastName}`
            }
        },
        {
            id: 2,
            field: 'Действие',
            label: 'Действие',
            width: 150,
            renderCell: (params) => {
                return <Button value={'Удалить'} onClick={() => {
                    const row = params.row;
                    const index = rows.indexOf(row);
                    const newArray = [...rows]
                    newArray.splice(index, 1)
                    setRows(newArray)
                }}></Button>
            }
        }]

    const getSquads = () => {
        axios.get(`${serverURL}/api/v1/searches/${id}/squads`).then(({data}) => {
            setSquads(data);
        }, () => {
            showError('При загрузке отрядов произошла ошибка. Попробуйте позже.')
        })
    }
    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/participants`).then(function (response) {
            setDataPart (response.data.map(el => ({
                id: el.id,
                firstName: el.user.firstName,
                lastName: el.user.lastName
            })))

        }, () => {
            showError('При загрузке участников поиска произошла ошибка. Попробуйте позже.')
        })
        axios.get(`${serverURL}/api/v1/searches/${id}/coordinators`).then(function (response) {
            setCoordinators (response.data.map(el => ({
                id: el.id,
                firstName: el.user.firstName,
                lastName: el.user.lastName
            })))
        }, () => {
            showError('При загрузке координаторов групп произошла ошибка. Попробуйте позже.')
        })

        getSquads();
    }, [])

    let participantOptions = DataPart.map (function(elem){
        return {
            label: elem.firstName + ' ' + elem.lastName,
            value: elem.id
        }
    })
    let coordinatorOptions = coordinators.map (function(elem){
        return {
            label: elem.firstName + ' ' + elem.lastName,
            value: elem.id
        }
    })

    function onDelete() {
        getSquads()
    }

    return (
        <div className={'squadsPage'}>
            <h2>Отряды поиска ФИО</h2>
            <div>
                <div className="Title">
                    <div className="Select1">
                        <Select
                            label={'Участник группы: '}
                            value={selectVal1}
                            options={participantOptions}
                            onChange={(val)=>{setSelectVal1(val)}}>
                        </Select>
                        <div className="Button1">
                            <Button value={'Добавить в группу'} onClick={() => {
                                let firstLastName = DataPart.find ((elem) => elem.id===parseInt(selectVal1))
                                setRows([...rows, firstLastName])
                            }}></Button>
                        </div>
                    </div>


                    <div className="Select2" >
                        <Select
                            label={'Координатор: '}
                            value={selectVal2}
                            options={coordinatorOptions}
                            onChange={(val)=>{setSelectVal2(val)}}>
                        </Select> </div>
                </div>
                <div className={'table'}>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                            disableSelectionOnClick
                        />
                    </div>

                </div>
                <div className="Button2">
                    <Button value={'Сохранить'} onClick={() => {
                        axios.post(`${serverURL}/api/v1/searches/${id}/squads`, {
                            coordinatorId: selectVal2,
                            participants: rows.map(row => row.id)
                        }).then(()=> {
                            showSuccess('Отряд сохранен')
                            getSquads()
                        }, () => {
                            showError('При сохранении произошла ошибка')
                        })
                    }}></Button>
                </div>
            </div>
            <div>
                {squads.map((squad, i) => <SquadsTable key={i} squad={squad} onDelete={onDelete}/>)}
            </div>
        </div>

    )
}


export default SquadsSearch;