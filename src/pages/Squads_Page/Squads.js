import React, {useState, useEffect}from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './squads.css'
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import SquadsTable from "../../components/squadsTable/squadsTable";
import GridTable from "@nadavshaar/react-grid-table";
import axios from "axios";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import {serverURL} from "../../config";

function SquadsSearch() {
    const [selectVal1, setSelectVal1] = useState('')
    const [selectVal2, setSelectVal2] = useState('')
    const [rows, setRows ] = useState([]);
    const [DataPart, setDataPart]= useState([]);
    let match = useRouteMatch()
    const id = match.params.id

    const getRows = (() => {
        console.log(rows);
        return rows
    })()

    function deleteEl(el) {

        const _rows = getRows
        debugger
        const index = rows.indexOf(el);// 0 - 9
        rows.splice(index, 1)

        setRows(rows );
    }
    const Username = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
                {data.firstName} {data.lastName}
            </div>
        )
    }
    const Do = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <Button value={'Удалить'} onClick={(()=> () => deleteEl(data))()}></Button>
            </div>
        )
    }
    const columns = [
        {
            id: 1,
            field: 'Name',
            label: 'Name',
            cellRenderer: Username
        },
        {
            id: 2,
            field: 'actionType',
            label: 'Actions',
            cellRenderer: Do
        }]

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/participants`).then(function (response) {
            setDataPart (response.data.map(el => ({
                id: el.id,
                firstName: el.user.firstName,
                lastName: el.user.lastName
            })))

        }).catch(function (error) {

        })
    }, [])

        let arr = DataPart;
        let options = arr.map (function(elem){
            return {
                label: elem.firstName + ' ' + elem.lastName,
                value: elem.id
            }
        })

    // <SquadsTable coordinator={{firstName: '', lastName:''}} table={[]}/>
    return (<div className={'squadsPage'}>
            <h2>Отряды поиска ФИО</h2>
        <div className="Title">
                <div className="Select1">
                    <Select
                        label={'Участник группы: '}
                        value={selectVal1}
                        options={options}
                        onChange={(val)=>{setSelectVal1(val)}}>
                    </Select>
                    <div className="Button1">
                    <Button value={'Добавить в группу'} onClick={() => {
                        let firstLastName = DataPart.find ((elem) => elem.id===parseInt(selectVal1))
                        // rows.push (firstLastName)
                        setRows([...rows, firstLastName])
                    }}></Button>
                    </div>
                </div>


                <div className="Select2" >
                    <Select
                    label={'Координатор: '}
                    value={selectVal2}
                    options={options}
                    onChange={(val)=>{setSelectVal2(val)}}>
                </Select> </div>
    </div>
            <div className={'table'}>
                <GridTable columns={columns} rows={rows}></GridTable>
            </div>
            <div className="Button2">
                <Button value={'Сохранить'} onClick={() => {
                    axios.post(`http://localhost:3000/api/v1/searches/${id}/squads`, {
                        coordinatorId: selectVal2,
                        participants: rows.map(row => row.id)
                    })
                }}></Button>
            </div>
        </div>

    )
}


export default SquadsSearch;