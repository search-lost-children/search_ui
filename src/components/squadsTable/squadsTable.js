import './squadsTable.css'
import Popup from "reactjs-popup";
import React, {useState} from "react";
import GridTable from "@nadavshaar/react-grid-table";
import Button from "../button/button";

function SquadsTable (props) {
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
            label: 'Action'
        }]

    return (
        <div className={'squadsPage'}>
            <div className="Title">
                <div>Координатор: ФИО</div>
                <div>Участников:</div>
            </div>
            <div className={'table'}>
                <GridTable columns={columns} rows={rows}></GridTable>
            </div>
            <div className="Button">
                <Button value={'Удалить'} onClick={() => {
                alert('button is clicked')
            }}></Button>
            </div>
        </div>
    );
}

export default SquadsTable;