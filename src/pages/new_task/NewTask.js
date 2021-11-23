import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './new_task.css'
import Radio from "../../components/radio/radio";
import Select from "../../components/select/select";
import Button from "../../components/button/button";


function NewTask() {
    const [radioVal1, setRadioVal1 ] = useState('');
    const [radioVal2, setRadioVal2 ] = useState('');
    const [selectVal, setSelectVal] = useState('');

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
                            options={[{label: 'ФИО1', value:'value1'}, {label: 'ФИО2', value:'value2'}]}
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