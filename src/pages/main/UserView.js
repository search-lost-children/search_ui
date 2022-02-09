import {useEffect, useState} from "react";
import axios from "axios";
import {serverURL} from "../../config";
import {useDispatch} from "react-redux";
import {showNotification} from "../../features/notificationSlice";
import {Avatar, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export default function UserView () {
    const dispatch = useDispatch()
    const [searches, setSearches] = useState([])
    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches?status=active&relations=participants`).then(function (response) {
            setSearches(response.data)
        }).catch(function (error) {
            dispatch(showNotification({
                message: 'Во время загрузки данных произошла ошибка',
                severity: 'error'
            }))
        })
    }, [])
    const cards = searches.map((search, i) => {
        return <Card style={{width: '300px'}} key={i}>
            <CardMedia component="img"
                       height="140"
                       image={search.photo}/>
            <CardContent>
                <Typography>
                    {search.firstName} {search.lastName}
                </Typography>
            </CardContent>
            <CardActions></CardActions>
        </Card>
    })
    return (<div>
        <h2>This is user view</h2>
        {cards.length ? <div style={{display: 'flex'}}>
            {cards}
        </div> : null}

    </div>);
}