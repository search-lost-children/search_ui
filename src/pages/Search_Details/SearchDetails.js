import Button from "../../components/button/button";
import React, {useEffect, useState} from "react";
import CheckBox from "../../components/checkbox/checkbox";
import './SearchDetails.css';
import {useHistory, useRouteMatch} from "react-router-dom";
import axios from "axios";
import {serverURL} from "../../config";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Map from "../../components/map/Map";
import Select from "../../components/select/select";
import {getColor} from "../../services/color.service";

function SearchDetails() {
    const history = useHistory();
    let match = useRouteMatch();
    const id = match.params.id;
    const [peopleCoordinates, setPeopleCoordinated] = useState([]);
    const [status, setStatus] = useState();
    const [showPeopleCoordinates, setShowShowPeopleCoordinatesCoordinates] = useState(false);
    const [showZones, setShowZonesCheck] = useState(false);
    const [searchZones, setSearchZones] = useState([]);
    const [markings, setMarkings] = useState(false);

    function createCoordinateStorageObject({userId, firstName, lastName, lat, lng, time, phoneNumber}) {
        return {
            userId,
            firstName,
            lastName,
            phoneNumber,
            coordinates: [
                {
                    lng: lng,
                    lat: lat,
                    time: time
                }]
        }
    }

    function dataStoring(data){
        let grouped = []
        for(let i = 0; i < data.length; i++){
            let findResult = grouped.find((el) => el.userId === data[i].userId)
            if( findResult !== undefined){
                findResult.coordinates.push({
                    lng: data[i].lng,
                    lat: data[i].lat,
                    time: data[i].time
                })
            }else{
                grouped.push(createCoordinateStorageObject(data[i]))
            }
        }
        return grouped
    }

    async function requestCoordinates() {
        axios.get(`${serverURL}/api/v1/searches/${id}/coordinates/`)
            .then(function (response) {
                setPeopleCoordinated(dataStoring(response.data.sort((a,b) => new Date(a.time)-new Date(b.time))))
            })
    }

    useEffect(async () => {
        let timerId = setInterval(requestCoordinates, 60000)
        await requestCoordinates()
        return function () {
            clearInterval(timerId)
        }
    }, [id]);

    useEffect(() => {
        if(showZones) {
            axios.get(`${serverURL}/api/v1/searches/${id}/tasks`).then(({data}) => {
                setSearchZones(data)
            })
        }

    }, [id, showZones])

    function Actions({close}) {
        return (<div className={'space'}>
            <Button value={'????'} color="secondary" onClick={() => {
                axios.put(`${serverURL}/api/v1/searches/${id}`, {"status": status}
                ).then(() => {
                    close();
                    history.push('/searches')
                })
            }}></Button>
            <div></div>
            <Button value={'??????'} onClick={() => {
                close();
            }}></Button>
        </div>)
    }

    const mapProps = {
        pathes: [],
        square: [],
        markers: []
    }

    if(showZones) {
        searchZones.forEach((task) => {
            if (task.locationType === 'square') {
                mapProps.square.push(JSON.parse(task.location))
            } else {
                mapProps.pathes.push(JSON.parse(task.location))
            }
        })
    }

    if(showPeopleCoordinates) {
        peopleCoordinates.forEach((el) => {
            const lastCoordinate = el.coordinates[el.coordinates.length - 1 ]
            mapProps.markers.push({
                lat: lastCoordinate.lat,
                lng: lastCoordinate.lng,
                infoWindow: {
                    content:
`<div> 
    <div> ?????? ${el.firstName} </div>
    <div>?????????????? ${el.lastName} </div>
    <div>?????????? ???????????????? ${el.phoneNumber}</div>  
</div>`

                }
            })

            mapProps.pathes.push( {
                path: el.coordinates,
                geodesic: true,
                strokeColor: getColor(el.userId),
                strokeOpacity: 1.0,
                strokeWeight: 2
            })
        })
    }


    return (<div className={'searchDetails'}>
            <h1>?????????? ??????</h1>
            <div className={'pageDetails'}>
                <div className={'map'}>
                    <Map dim={{height:'100%', width:'100%'}} {...mapProps} />
                </div>
                <div className={'info'}>
                    <div className={'buttons'}>
                        <Button value={'????????????????'} onClick={() => {
                            history.push(`/searches/${id}/participants/`)
                        }}></Button>
                        <Button value={'????????????????????????'} onClick={() => {
                            history.push(`/searches/${id}/coordinators/`)
                        }}></Button>
                        <Button value={'????????????'} onClick={() => {
                            history.push(`/searches/${id}/squads/`)
                        }}></Button>
                        <Button value={'???????????????? ??????????????'} onClick={() => {
                            history.push(`/searches/${id}/new_task/`)
                        }}></Button>
                    </div>
                    <div className={'bottomBox'}>
                        <div className={'checkboxes'}>
                            <CheckBox name={'People'} checked={showPeopleCoordinates} label={'????????'} onChange={(val) => {
                                setShowShowPeopleCoordinatesCoordinates(val)
                            }}></CheckBox>
                            <CheckBox name={'Zones'} checked={showZones} label={'???????? ????????????'} onChange={(val) => {
                                setShowZonesCheck(val)
                            }}></CheckBox>
                            <CheckBox name={'Markings'} checked={markings} label={'??????????????'} onChange={(val) => {
                                setMarkings(val)
                            }}></CheckBox>
                        </div>
                        <div className={'complete'}>
                            <ModalWindow
                                trigger={<Button value={'??????????????????'}></Button>}
                                title={'???????????????????? ????????????'}
                                actions={Actions}
                            >
                                <div>
                                    <h2 align="center">????????????????, ?????? ???????????? ?????????????????? ???????????</h2>
                                    <p>???????????????? ???????????? ????????????:</p>
                                    <Select shrink label={"???????????? ????????????"}
                                            value={status}
                                            options={[{label: '??????????????', value: 'active'},
                                                {label: '????????????, ??????', value: 'finished Success'},
                                                {label: '????????????, ??????????', value: 'finished Died'}]}
                                            onChange={(val)=>{setStatus(val)}}
                                            ></Select>
                                </div>
                            </ModalWindow>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchDetails;