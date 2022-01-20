import GridTable from "@nadavshaar/react-grid-table";
import React, {useState, useEffect}from 'react';
import './TasksList.css'
import axios from "axios";
import {serverURL} from "../../config";
import {useRouteMatch} from "react-router-dom";


function TasksList() {
    const [rows, setRows ] = useState([]);
    const columns = [
        {
            id: 1,
            field: 'taskType',
            label: 'Индивидуально/Группа'

        },
        {
            id: 2,
            field: 'locationType',
            label: 'Область карты/Маршрут'
        },
        {
            id: 3,
            field: 'location',
            label: 'Координаты'
        },
        {
            id: 4,
            field: 'executorId',
            label: 'Исполнитель'
        },
]
    let match = useRouteMatch()
    const id = match.params.id

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/searches/${id}/tasks`).then(function (response) {
            setRows(response.data)
        }).catch(function (error) {
            console.log('error')
        }).then(function () {
          // always executed
        });
    }, []);

    return (<div className={'tasksListPage'}>
            <h2>Список задач</h2>
            <div className={'table'}>
                <GridTable columns={columns} rows={rows}></GridTable>
            </div>

        </div>
    )
}

export default TasksList;