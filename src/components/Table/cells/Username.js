import TableCell from "@mui/material/TableCell";
import * as React from "react";

export default function Username ({data}) {
    const firstName = data.firstName || data.user.firstName
    const lastName = data.lastName || data.user.lastName
    debugger
    return (
        <TableCell component="th" scope="row">
            {firstName} {lastName}
        </TableCell>
    )
}