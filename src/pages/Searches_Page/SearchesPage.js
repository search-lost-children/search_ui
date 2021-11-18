import GridTable from "@nadavshaar/react-grid-table";
import React from "react";
import Button from "../../components/button/button";
import './SearchesPage.css'

function SearchesPage () {
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
                Edit
            </div>
        )
    }

    const columns = [
        {
            id: 1,
            field: '',
            label: 'ФИО',
            cellRenderer: Username
        },
        {
            id: 2,
            field: 'status',
            label: 'Статус'
        },
        {
            id: 3,
            field: ' ',
            label: 'Действие',
            cellRenderer: Do
        }
    ];

    const rows = [
        {
            "id": 1,
            'firstName': 'Ada',
            'lastName': 'Lovelace',
            'status': 'в процессе',
        },
        {
            "id": 2,
            'firstName': 'Grace',
            'lastName': 'Hopper',
            'status': 'завершен',
        },
        {
            "id": 3,
            'firstName': 'Margaret',
            'lastName': 'Hamilton',
            'status': 'завершен',
        },
        {
            "id": 4,
            'firstName': 'Joan',
            'lastName': 'Clarke',
            'status': 'завершен',
        },
    ];

    return( <div className={'searchesPage'}>

         <div className={'initButton'}>
    <Button value={'Инициировать'} onClick={() => {
        alert('button is clicked')
    }}></Button>
         </div>

         <div className={'table'}>
    <GridTable columns={columns} rows={rows}></GridTable>
         </div>
        </div>
)}
export default SearchesPage;