import React from "react";

export default function Username ({tableManager, value, field, data, column, colIndex, rowIndex}) {
    const firstName = data.firstName || data.user.firstName
    const lastName = data.lastName || data.user.lastName
    return (
        <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
            {firstName} {lastName}
        </div>
    )
}