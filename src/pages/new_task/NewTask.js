import React, {useState, useEffect}from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './new_task.css'
import Radio from "../../components/radio/radio";
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import axios from "axios";
import Map from "../../components/map/Map";

function NewTask() {
    const [groupOrIndividual, setGroupOrIndividual ] = useState('group');
    const [WayOrSquare, setWayOrSquare ] = useState('way');
    const [selectVal, setSelectVal] = useState('');
    const [DataPart, setDataPart]= useState([]);
    const [DataSq, setDataSq]= useState([]);
    const [waypoints, setWaypoints] = useState([])

    const history = useHistory();
    let match = useRouteMatch()
    const id = match.params.id

    useEffect(() => {
        axios.get('/api/v1/searches/:id/coordinators/participants').then(function (response) {
            setDataPart (response.data)
        }).catch(function (error) {
            console.log('error')
        })

        axios.get('/api/v1/searches/:id/coordinators/squads').then(function (response) {
            setDataSq(response.data)
        }).catch(function (error) {
            console.log('error')
        })
    }, [])

    let arr;

    if (groupOrIndividual==='group'){
        arr = DataSq
    }else {
        arr = DataPart
    }

    let options = arr.map (function(elem){
        return {
            label: elem.firstName + ' ' + elem.lastName,
            value: elem.id
        }
    })

    const mapSettings = {
        onClick: (coords) => {
            const _waypoints = [...waypoints];
            _waypoints.push({
                lat:coords.lat,
                lng: coords.lng
            })
            setWaypoints(_waypoints)
        }
    }

    const mapWaypoints = {}
    if(WayOrSquare === 'square') {
        mapWaypoints.square=waypoints
    } else {
        mapWaypoints.pathes = [waypoints]
    }

    return (
        <div className="New Task">
            <h2>Новое задание</h2>
            <div className="Radio">
                    <Radio name={'groupOrIndividual'} checked={groupOrIndividual === 'group'} label={'Экипаж'} value={'group'} onChange={(val)=>{setGroupOrIndividual(val)}}></Radio>
                    <Radio name={'groupOrIndividual'} checked={groupOrIndividual === 'individual'} label={'Индивидуально'} value={'individual'} onChange={(val)=>{setGroupOrIndividual(val)}}></Radio>
            </div>
            <div className="Select">
                    <Select
                            label={'Select '}
                            value={selectVal}
                            options={options}
                            onChange={(val)=>{setSelectVal(val)}}>
                    </Select>
            </div>
            <div className="Radio" >
                    <Radio name={'RadioButton2'} checked={WayOrSquare === 'square'} label={'Область'} value={'square'} onChange={(val)=>{setWayOrSquare(val); setWaypoints([])}}></Radio>
                    <Radio name={'RadioButton2'} checked={WayOrSquare === 'way'} label={'Путь'} value={'way'} onChange={(val)=>{setWayOrSquare(val); setWaypoints([])}}></Radio>
            </div>
            <div className="Map">
                    <Map {...mapWaypoints} map={mapSettings} dim={{width: '100%', height:'100%'}} />
            </div>
            <div className="Button">
                    <Button value={'Применить'} onClick={()=>{
                        console.log(selectVal);
                        axios.post(`http://localhost:3000/api/v1/searches/${id}/tasks`,{
                            taskType: groupOrIndividual,
                            locationType: WayOrSquare,
                            location: waypoints,
                            executorId: '1'
                        })
                            .then(function (response) {
                                history.push(`/searches/${id}`)
                            }).catch(function (error) {
                                console.log('error')
                            })
                    }}></Button>
            </div>
        </div>
    )
}

export default NewTask;