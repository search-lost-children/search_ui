import GridTable from "@nadavshaar/react-grid-table";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Button from "../../components/button/button";
import './SearchesPage.css';
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ModalWindow from "../../components/ModalWindow/ModalWindow";

function SearchesPage() {
    const [rows, setData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get('https://example.com/').then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            console.log('error')
            setData([
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
            ])

        }).then(function () {
            // always executed
        });
    });


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
                    trigger={<Button value={'Edit'}></Button>}
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

    return (<div className={'searchesPage'}>

            <div className={'initButton'}>
                <Button value={'Инициировать'} onClick={() => {
                    history.push('/searches/new')
                }}></Button>
            </div>

            <div className={'table'}>
                <GridTable columns={columns} rows={rows}></GridTable>
            </div>
        </div>
    )
}

export default SearchesPage;