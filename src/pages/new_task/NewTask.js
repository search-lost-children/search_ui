import React, {useState, useEffect}from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import './new_task.css'
import Radio from "../../components/radio/radio";
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import axios from "axios";
import Map from "../../components/map/Map";
import {serverURL} from "../../config";
import {useShowError, useShowSuccess} from "../../services/notification.service";

function NewTask() {
    const [groupOrIndividual, setGroupOrIndividual ] = useState('group');
    const [WayOrSquare, setWayOrSquare ] = useState('way');
    const [selectVal, setSelectVal] = useState('');
    const [DataPart, setDataPart]= useState([]);
    const [DataSq, setDataSq]= useState([]);
    const [waypoints, setWaypoints] = useState([])

    const showError = useShowError()
    const showSuccess = useShowSuccess()

    const history = useHistory();
    let match = useRouteMatch()
    const id = match.params.id

    useEffect(() => {
        axios.get(`${serverURL}/api/v1/searches/${id}/participants`).then(function (response) {
            setDataPart (response.data)
        }).catch(function (error) {
            showError('При загрузке участников произошла ошибка')
        })

        axios.get(`${serverURL}/api/v1/searches/${id}/squads`).then(function (response) {
            setDataSq(response.data)
        }).catch(function (error) {
            showError('При загрузке отрядов произошла ошибка')
        })
    }, [id])

    let options;

    if (groupOrIndividual==='group'){
        options = DataSq.map((squad) => {
            return {
                label: `Коорд: ${squad.coordinator.user.firstName}, уч: ${squad.participants.length}`,
                value: squad.id
            }
        })
    }else {
        options = DataPart.map (function(elem){
            return {
                label: elem.user.firstName + ' ' + elem.user.lastName,
                value: elem.id
            }
        })
    }


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
                    <Radio
                        name={'groupOrIndividual'}
                        checked={groupOrIndividual === 'group'}
                        label={'Отряд'}
                        value={'group'}
                        onChange={(val)=>{setGroupOrIndividual(val); setSelectVal('')}} />
                    <Radio
                        name={'groupOrIndividual'}
                        checked={groupOrIndividual === 'individual'}
                        label={'Индивидуально'}
                        value={'individual'}
                        onChange={(val)=>{setGroupOrIndividual(val); setSelectVal('')}} />
            </div>
            <div className="Select">
                    <Select
                        label={'Select '}
                        value={selectVal}
                        options={options}
                        onChange={(val)=>{setSelectVal(val)}} />

            </div>
            <div className="Radio" >
                    <Radio
                        name={'RadioButton2'}
                        checked={WayOrSquare === 'square'}
                        label={'Область'}
                        value={'square'}
                        onChange={(val)=>{setWayOrSquare(val); setWaypoints([])}} />
                    <Radio
                        name={'RadioButton2'}
                        checked={WayOrSquare === 'way'}
                        label={'Путь'}
                        value={'way'}
                        onChange={(val)=>{setWayOrSquare(val); setWaypoints([])}} />
            </div>
            <div className="Map">
                    <Map {...mapWaypoints} map={mapSettings} dim={{width: '100%', height:'100%'}} />
            </div>
            <div className="Button">
                    <Button value={'Применить'} onClick={()=>{
                        axios.post(`${serverURL}/api/v1/searches/${id}/tasks`,{
                            taskType: groupOrIndividual,
                            locationType: WayOrSquare,
                            location: waypoints,
                            executorId: selectVal
                        })
                            .then(function (response) {
                                showSuccess('Задание сохранено')
                                history.push(`/searches/${id}/details`)
                            }, function (error) {
                                showError('При сохранении задания произошла ошибка')
                            })
                    }} />
            </div>
        </div>
    )
}

export default NewTask;