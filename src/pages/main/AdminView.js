import Button from "../../components/button/button";
import React from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/input/input";
import Box from "@mui/material/Box";

export default function AdminView () {
    const history  = useHistory();
    return (
        <div>
            <h2>Admin view</h2>
            <Box
                component="form"
                sx={{'& button': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="off"
            >
                <Button value={'посмотреть поиски'} onClick={()=>{history.push('/searches')}}></Button>
                <Button value={'новый поиск'} onClick={()=>{history.push('/searches/new')}}></Button>
            </Box>
        </div>

    )
}