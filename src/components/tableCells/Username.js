import React from "react";

export default function Username ({tableManager, value, field, data, column, colIndex, rowIndex}) {
    return (
        <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
            {data.firstName} {data.lastName}
        </div>
    )
}