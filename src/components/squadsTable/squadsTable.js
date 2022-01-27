import './squadsTable.css'
import Popup from "reactjs-popup";
import React, {useState} from "react";
import GridTable from "@nadavshaar/react-grid-table";
import Button from "../button/button";

function SquadsTable (props) {
    const [rows, setRows ] = useState([]);
    const [form, setForm] = useState(true);
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

    return (
        <div className={'squadsPage'}>
            <div className="Title" onClick={()=>setForm(!form)}>
                <div>Координатор: {props.coordinator.firstName} </div>
                <div>Участников: {props.table.length} </div>
            </div>
            <div style={{
                display:form ? 'block' : 'none'
            }}>
                <div className={'table'}>
                    <GridTable columns={columns} rows={props.table}></GridTable>
                </div>
                <div className="Button">
                    <Button value={'Удалить'} onClick={() => {
                        alert('button is clicked')
                    }}></Button>
                </div>
            </div>

        </div>
    );
}

export default SquadsTable;