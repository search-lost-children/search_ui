import React, {useState, useEffect}from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './squads.css'
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import SquadsTable from "../../components/squadsTable/squadsTable";
import GridTable from "@nadavshaar/react-grid-table";
import axios from "axios";

function SquadsSearch() {
    const [selectVal, setSelectVal] = useState('');
    const [rows, setRows ] = useState([]);
    const [DataPart, setDataPart]= useState([]);
    const columns = [
        {
            id: 1,
            field: 'Name',
            label: 'Name'
        },
        {
            id: 2,
            field: 'actionType',
            label: 'Actions'
        }]

    useEffect(() => {
        axios.get('/api/v1/searches/:id/participants').then(function (response) {
            setDataPart (response.data)
        }).catch(function (error) {
            console.log('error')
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
                        value={selectVal}
                        options={options}
                        onChange={(val)=>{setSelectVal(val)}}>
                    </Select>
                    <div className="Button1">
                    <Button value={'Добавить в группу'} onClick={() => {
                        alert('button is clicked')
                    }}></Button>
                    </div>
                </div>


                <div className="Select2" >
                    <Select
                    label={'Координатор: '}
                    value={selectVal}
                    options={options}
                    onChange={(val)=>{setSelectVal(val)}}>
                </Select> </div>
    </div>
            <div className={'table'}>
                <GridTable columns={columns} rows={rows}></GridTable>
            </div>
            <div className="Button2">
                <Button value={'Сохранить'} onClick={() => {
                    alert('button is clicked')
                }}></Button>
            </div>
        </div>

    )
}


export default SquadsSearch;