import GridTable from "@nadavshaar/react-grid-table";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Button from "../../components/button/button";
import './SearchesPage.css';
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
                <Popup trigger={<Button value={'Edit'}></Button>} position="right center" modal>
                    {close => (<div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Modal Title</div>
                        <div className="content">
                            {' '}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                            Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                            delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                            <br/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                            commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                            explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                        </div>
                        <div className="actions">
                            <Popup
                                trigger={<button className="button"> Trigger </button>}
                                position="top center"
                                nested
                            >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
                            </Popup>
                            <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                }}
                            >
                                close modal
                            </button>
                        </div>
                    </div>)}
                </Popup>
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