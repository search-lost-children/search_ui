import {useEffect, useState} from "react";
import axios from "axios";
import {serverURL} from "../../config";
import {useDispatch} from "react-redux";
import {showNotification} from "../../features/notificationSlice";
import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';
import Button from "../../components/button/button";

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
        const isPart = !!search.participants.length;
        return <Card style={{width: '300px'}} key={i}>
            <CardMedia component="img"
                       height="140"
                       image={search.photo}/>
            <CardContent>
                <Typography>
                    {search.firstName} {search.lastName}
                </Typography>
                <Typography>
                    {isPart ? <div>
                        <CheckIcon sx={{ color: green[500] }}/>
                        Вы принимаете участие в данном поиске
                    </div> : null}
                </Typography>
            </CardContent>
            <CardActions>
                <Button value={isPart? "Перейти на странице" : "Принять участие"}></Button>
            </CardActions>
        </Card>
    })
    return (<div>
        <h2>This is user view</h2>
        {cards.length ? <div style={{display: 'flex'}}>
            {cards}
        </div> : null}

    </div>);
}