import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './new_task.css'
import Radio from "../../components/radio/radio";
import Select from "../../components/select/select";
import Button from "../../components/button/button";


function NewTask() {
    const [radioVal, setRadioVal] = useState('');
    const [selectVal, setSelectVal] = useState('');

    return (
        <div className="New Task">
            <h2>Новое задание</h2>
            <div className="Radio">
                    <Radio name={'RadioButton'} checked={radioVal === 'val1'} label={'Экипаж'} value={'val1'} onChange={(val)=>{setRadioVal(val)}}></Radio>
                    <Radio name={'RadioButton'} checked={radioVal === 'val2'} label={'Индивидуально'} value={'val2'} onChange={(val)=>{setRadioVal(val)}}></Radio>
            </div>
            <div className="Select">
                    <Select
                            label={'Select Form'}
                            value={selectVal}
                            options={[{label: 'ФИО1', value:'value1'}, {label: 'ФИО2', value:'value2'}]}
                            onChange={(val)=>{setSelectVal(val)}}>

                    </Select>
            </div>
            <div className="Radio" >
                    <Radio name={'RadioButton'} checked={radioVal === 'val3'} label={'Область'} value={'val3'} onChange={(val)=>{setRadioVal(val)}}></Radio>
                    <Radio name={'RadioButton'} checked={radioVal === 'val4'} label={'Путь'} value={'val4'} onChange={(val)=>{setRadioVal(val)}}></Radio>
            </div>
            <div>
                    <p> ТУТ БУДЕТ КАРТА</p>
            </div>
            <div className="Button">
                    <Button value={'Применить'} onClick={()=>{alert('button is clicked')}}></Button>
            </div>

        </div>

    )
}

export default NewTask;