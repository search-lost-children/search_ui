import React, {useState, useEffect}from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './squads.css'
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import SquadsTable from "../../components/squadsTable/squadsTable";
import GridTable from "@nadavshaar/react-grid-table";
import axios from "axios";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

function SquadsSearch() {
    const [selectVal1, setSelectVal1] = useState('')
    const [selectVal2, setSelectVal2] = useState('')
    const [rows, setRows ] = useState([]);
    const [DataPart, setDataPart]= useState([]);
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
                <ModalWindow
                    trigger={<Button value={'Удалить'}></Button>}
                    title={'Modal Title'}
                >
                    <div>
                        Some random text
                    </div>
                </ModalWindow>
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
        axios.get('/api/v1/searches/:id/participants').then(function (response) {
            setDataPart (response.data)
        }).catch(function (error) {
            console.log('error')
            //remove this
            setDataPart([{
                id:1,
                firstName: 'asd',
                lastName: 'qwdscx'
            }, {
                id:2,
                firstName: 'asdqwer',
                lastName: 'qwdscx'
            },
            {
                id:3,
                firstName: 'rtyughfn',
                lastName: 'qwdscx'
            }])

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

                        setRows([firstLastName])
                        //alert('button is clicked')
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
                    axios.post(`http://localhost:3000/api/v1/searches/:id/participants`,rows)
                }}></Button>
            </div>
        </div>

    )
}


export default SquadsSearch;