import React, {useState} from 'react';
import './documentation.css'
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Radio from "../../components/radio/radio";
import TextArea from "../../components/textarea/textarea";
import Select from "../../components/select/select";
import CheckBox from "../../components/checkbox/checkbox";

function DocumentationPage () {
    const [inputVal, setInputVal] = useState('');
    const [textAreaVal, setTextAreaVal] = useState('');
    const [radioVal, setRadioVal] = useState('');
    const [selectVal, setSelectVal] = useState('');
    const [checkboxVal, setCheckboxVal] = useState(false);

    return (<div className={"documentationPage"}>
        <div>
            <h3>Input</h3>
            <pre>
                <code>
                    <div>
                        {'<Input type="login" label={"Login"} value={value} onChange={onChange}></Input>'}
                    </div>
                    <div>type='тип(текст, логин, пароль и др.)'</div>
                    <div>label='лейбл для инпута'</div>
                    <div>value='надпись внутри инпута по-умолчанию'</div>
                    <div>onChange='Что будет делать инпут при нажатии'</div>
                </code>
            </pre>
            <Input type='login' label={'Login'} value={inputVal} onChange={(val)=> setInputVal((val))}></Input>
        </div>
        <div>
            <h3>Button</h3>
            <pre>
                <code>
                    {'<Button value={\'PUSH ME\'} onClick={()=>{alert(\'button is clicked\')}}></Button>'}
                    <div>value='надпись внутри кнопки'</div>
                    <div>label='лейбл для кнопки'</div>
                    <div>onClick='Что будет делать кнопка при нажатии' </div>
                </code>
            </pre>

            <Button value={'PUSH ME'} onClick={()=>{alert('button is clicked')}}></Button>
        </div>

        <div>
            <h3>Radio</h3>
            <pre>
                <code>
                    {'<Radio name={\'RadioButton\'} checked={false} label={\'Radio Button\'} onClick={()=>{}}></Radio>'}
                    <div>name='имя радио-баттона'</div>
                    <div>value= значение радио</div>
                    <div>checked=false-если радио-баттон выбран</div>
                    <div>label='лейбл для радио-баттона'</div>
                    <div>onChange='Что будет делать радио-баттон при нажатии'</div>
                </code>
            </pre>
            <Radio name={'RadioButton'} checked={radioVal === 'val1'} label={'Radio Button1'} value={'val1'} onChange={(val)=>{setRadioVal(val)}}></Radio>
            <Radio name={'RadioButton'} checked={radioVal === 'val2'} label={'Radio Button2'} value={'val2'} onChange={(val)=>{setRadioVal(val)}}></Radio>
            <Radio name={'RadioButton'} checked={radioVal === 'val3'} label={'Radio Button3'} value={'val3'} onChange={(val)=>{setRadioVal(val)}}></Radio>
        </div>
        <div>
            <h3>TextArea</h3>
            <pre>
                <code>
                    {'<TextArea type=\'text\' label={\'Text Area\'} value={\'text here...\'} onChange={()=>{}}></TextArea>'}
                    <div>type='тип(текст, описание и др.)'</div>
                    <div>label='лейбл для текстового поля'</div>
                    <div>value='надпись текстового поля по-умолчанию'</div>
                    <div>onChange='Что будет делать текстовое поле при нажатии'</div>
                </code>
            </pre>
            <TextArea type='text' label={'Text Area'} value={textAreaVal} onChange={(val)=>{setTextAreaVal(val)}}></TextArea>
        </div>

        <div>
            <h3>Select</h3>
            <pre>
                <code>
                    {'<Select label={\'Select Form\'} value={\'Value 1\'} options={[{name: "option1"}]} onChange={()=>{}}> </Select>'}
                    <div>label='лейбл для селектора'</div>
                    <div>value='название селектора'</div>
                    <div>options=[] - в options нужно передать массив! обьектов-опций</div>
                    <div>onChange='Что будет делать селект при выборе опции'</div>
                </code>
            </pre>
            <Select
                label={'Select Form'}
                value={selectVal}
                options={[{label: 'это лейбл 1', value:'value1'}, {label: 'это лейбл 2', value:'value2'}]}
                onChange={(val)=>{setSelectVal(val)}}></Select>
        </div>

        <div>
            <h3>CheckBox</h3>
            <pre>
                <code>
                    {'<CheckBox name={\'CheckBox\'} checked={checked} label={\'CheckBox\'} onClick={onClick}></CheckBox>'}
                    <div> name='имя чекбокса'</div>
                    <div>checked=true - если чекбокс выбран</div>
                    <div>label='лейбл для чекбокса'</div>
                    <div>onChange='Что будет делать чекбокс при нажатии'</div>
                </code>
            </pre>
            <CheckBox name={'CheckBox'} checked={checkboxVal} label={'CheckBox'} onChange={(val)=> {setCheckboxVal(val)}}></CheckBox>
        </div>
    </div>);
}

export default DocumentationPage