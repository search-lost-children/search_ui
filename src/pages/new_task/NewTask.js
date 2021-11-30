import React, {useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
import './new_task.css'
import Radio from "../../components/radio/radio";
import Select from "../../components/select/select";
import Button from "../../components/button/button";
import axios from "axios";


function NewTask() {
    const [radioVal1, setRadioVal1 ] = useState('');
    const [radioVal2, setRadioVal2 ] = useState('');
    const [selectVal, setSelectVal] = useState('');
    const [DataPart, setDataPart]= useState([{id:"4", firstName:'part1', lastName:'part2'}]);
    const [DataSq, setDataSq]= useState([{id:"5", firstName:'squad1', lastName:'squad2'}]);

    useEffect(() => {
        axios.get('/api/v1/searches/:id/coordinators/participants').then(function (response) {
            setDataPart (response.data)
            // [{id:"", firstName:'', lastName:''}]
        }).catch(function (error) {
            console.log('error')
        })

        axios.get('/api/v1/searches/:id/coordinators/squads').then(function (response) {
            setDataSq(response.data)
        }).catch(function (error) {
            console.log('error')
        })
    })

    let arr;

    if (radioVal1==='поисковая группа'){
        arr=DataSq
    }else {
        arr=DataPart
    }

    let options =arr.map (function(elem){ // {id:"", firstName:'', lastName:''}
    return {label: elem.firstName+' '+elem.lastName,
            value: elem.id} //{label: 'ФИО2', value:'value2'}
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
                    <p> ТУТ БУДЕТ КАРТА</p>
            </div>
            <div className="Button">
                    <Button value={'Применить'} onClick={()=>{alert('обработка данных')}}></Button>
            </div>

        </div>

    )
}

export default NewTask;