import * as React from 'react';
import MuTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Table (props) {

    return (
        <TableContainer component={Paper}>
            <MuTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.columns.map((col)=> {
                            return (
                                <TableCell key={col.id}>{col.label}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.columns.map((col) => {
                                if(col.cellRenderer) {
                                    return <col.cellRenderer key={col.field + i} data={row}></col.cellRenderer>
                                }
                                return (
                                    <TableCell key={col.field + i} component="th" scope="row">
                                        {row[col.field]}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </MuTable>
        </TableContainer>
    );
}