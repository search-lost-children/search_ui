import React, {useState, useEffect}from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './new_task.css'
import Radio from "../../components/radio/radio";
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import axios from "axios";
import Map from "../../components/map/Map";

function NewTask() {
    const [radioVal1, setRadioVal1 ] = useState('');
    const [radioVal2, setRadioVal2 ] = useState('');
    const [selectVal, setSelectVal] = useState('');
    const [DataPart, setDataPart]= useState([]);
    const [DataSq, setDataSq]= useState([]);
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

    if (radioVal1==='поисковая группа'){
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

    return (
        <div className="New Task">
            <h2>Новое задание</h2>
            <div className="Radio">
                    <Radio name={'RadioButton1'} checked={radioVal1 === 'поисковая группа'} label={'Экипаж'} value={'поисковая группа'} onChange={(val)=>{setRadioVal1(val)}}></Radio>
                    <Radio name={'RadioButton1'} checked={radioVal1 === 'один человек'} label={'Индивидуально'} value={'один человек'} onChange={(val)=>{setRadioVal1(val)}}></Radio>
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
                    <Radio name={'RadioButton2'} checked={radioVal2 === 'область карты'} label={'Область'} value={'область карты'} onChange={(val)=>{setRadioVal2(val)}}></Radio>
                    <Radio name={'RadioButton2'} checked={radioVal2 === 'маршрут'} label={'Путь'} value={'маршрут'} onChange={(val)=>{setRadioVal2(val)}}></Radio>
            </div>
            <div className="Map">
                    <Map />
            </div>
            <div className="Button">
                    <Button value={'Применить'} onClick={()=>{
                        console.log(selectVal);
                        axios.post(`http://localhost:3000/api/v1/searches/${id}/tasks`,{
                            taskType: radioVal1,
                            locationType: radioVal2,
                            location: [],
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