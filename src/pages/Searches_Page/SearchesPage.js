import GridTable from "@nadavshaar/react-grid-table";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Button from "../../components/button/button";
import './SearchesPage.css';
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import {serverURL} from "../../config";
import {useSelector} from "react-redux";
import Username from "../../components/tableCells/Username";
import Box from "@mui/material/Box";
import Input from "../../components/input/input";

function SearchesPage() {
    const [rows, setData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches`).then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            console.log('error')
        }).then(function () {
            // always executed
        });
    },[]);

    const Do = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <ModalWindow
                    trigger={<Button value={'действие'}></Button>}
                    title={'выберите действие'}
                >
                    <div>
                        <Box
                            component="form"
                            sx={{'& button': { m: 1, width: '35ch' },}}
                            noValidate
                            autoComplete="off"
                        >
                            <Button value={'перейти к управлению'} onClick={()=>{history.push(`/searches/${data.id}/details`)}}></Button>
                            <Button value={'изменить поиск'} onClick={()=>{history.push(`/searches/${data.id}/увше`)}}></Button>
                        </Box>
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

    const user = useSelector((state) => {
        return state.user.user
    })

    return (<div className={'searchesPage'}>

        {user.role !== 'admin' ? '' : <div className={'initButton'}>
            <Button value={'Инициировать'} onClick={() => {
                history.push('/searches/new')
            }}></Button>
        </div>}



            <div className={'table'}>
                <GridTable columns={columns} rows={rows}></GridTable>
            </div>
        </div>
    )
}

export default SearchesPage;
