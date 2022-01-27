import React, {useState, useEffect}from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './squads.css'
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import SquadsTable from "../../components/squadsTable/squadsTable";
import GridTable from "@nadavshaar/react-grid-table";

function SquadsSearch() {
    const [selectVal1, setSelectVal1] = useState('');
    const [selectVal2, setSelectVal2] = useState('');
    const [rows, setRows ] = useState([]);
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


    // <SquadsTable coordinator={{firstName: '', lastName:''}} table={[]}/>
    return (<div className={'squadsPage'}>
            <h2>Отряды поиска ФИО</h2>
            <div className="Title">
                <div>Участник группы:  <Select
                    label={'Select '}
                    value={setSelectVal1()}
                    options={options}
                    onChange={(val)=>{setSelectVal1(val)}}>
                </Select> </div>
                <div className="Button1">
                    <Button value={'Добавить в группу'} onClick={() => {
                        alert('button is clicked')
                    }}></Button>
                </div>
                <div>Координатор <Select
                    label={'Select '}
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
                    alert('button is clicked')
                }}></Button>
            </div>
        </div>
    )
}

export default SquadsSearch;