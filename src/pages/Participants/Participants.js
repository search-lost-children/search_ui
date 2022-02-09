import {useEffect, useState} from "react";
import GridTable from "@nadavshaar/react-grid-table";
import {useRouteMatch} from "react-router-dom";
import {serverURL} from "../../config";
import axios from "axios";
import {useDispatch} from "react-redux";
import {showNotification} from "../../features/notificationSlice";

export default function Participants (props) {
    const [rows, setRows] = useState([])
    const match = useRouteMatch();
    const id = match.params.id
    const dispatch = useDispatch()

    const columns = [
        {
            id: 1,
            field: 'user',
            label: 'Участник',
            getValue: ({value, column}) => `${value.firstName} ${value.lastName} ${value.phoneNumber}`
        },
        {
            id: 2,
            field: 'accessAllowed',
            label: 'Доступ',
            getValue: ({value, column}) => value ? 'Да': 'нет'
        }
    ]

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/participants`).then(({data}) => {
            setRows(data)
        }, ()=> {
            dispatch(showNotification({
                message: 'При загрузке данных произошла ошибка, попробуйте позже',
                severity: 'error'
            }))
        })
    }, [id])

    return (<div className={'participantsPage'}>
            <h2>Участники поиска</h2>

            <div className={'table'}>
                <GridTable columns={columns} rows={rows}></GridTable>
            </div>
        </div>
    );
}