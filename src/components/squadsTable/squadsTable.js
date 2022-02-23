import './squadsTable.css'
import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../button/button";
import {serverURL} from "../../config";
import {useRouteMatch} from "react-router-dom";
import axios from "axios";
import {useShowError, useShowSuccess} from "../../services/notification.service";

function SquadsTable (props) {
    const showSuccess = useShowSuccess();
    const showError = useShowError();
    let match = useRouteMatch()
    const id = match.params.id

    const columns = [
        {
            field: 'Name',
            headerName: 'Name',
            valueGetter: (params) => {
                return `${params.row.user.firstName} ${params.row.user.lastName}`
            }
        },
        {
            field: 'actionType',
            headerName: 'Actions',
            visible: false
        }]

    return (
        <div className={'squadsPage'}>
            <Accordion sx={{ width: '100%', flexShrink: 0 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <div style={{width: '100%', display:'flex', justifyContent: 'space-between'}}>
                        <div>Координатор: {props.squad.coordinator.user.firstName} {props.squad.coordinator.user.lastName}</div>
                        <div>Участников: {props.squad.participants.length} </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={props.squad.participants}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                            disableSelectionOnClick
                        />
                    </div>
                    <div className="Button">
                        <Button value={'Удалить'} onClick={() => {
                            const squadId = props.squad.id
                            axios.delete(`${serverURL}/api/v1/searches/${id}/squads/${squadId}`).then(()=> {
                                showSuccess('Отряд удален')
                                props.onDelete()
                            }, ()=> {
                                showError('При удалении данных произошла обибка. Попробуйте позже')
                            })
                        }}></Button>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

export default SquadsTable;