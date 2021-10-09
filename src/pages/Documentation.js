import React from 'react';
import Input from "../components/input";
import Button from "../components/button";
import Radio from "../components/radio";
import TextArea from "../components/textarea";
import Select from "../components/select";
import CheckBox from "../components/checkbox";

function DocumentationPage () {
    return (<div>
        this is documentation

        <code> <Input type='login' label={'Login'} value={props.value} onChange={onChange}></Input><Br>
            type='тип(текст, логин, пароль и др.)' <Br>
            label={'лейбл для инпута'} <Br>
            value={'надпись внутри инпута по-умолчанию'} <Br>
            onChange={'Что будет делать инпут при нажатии'} </code>
        <Input type='login' label={'Login'}></Input>

        <code> <Button value={'PUSH ME'} onClick={onClick}></Button><Br>
            value={'надпись внутри кнопки'} <Br>
            label={'лейбл для кнопки'} <Br>
            onClick={'Что будет делать кнопка при нажатии'} </code>
        <Button value={'PUSH ME'}></Button>

        <code> <Radio name={'RadioButton'} checked={checked} label={'Radio Button'} onClick={onClick}></Radio><Br>
            name={'имя радио-баттона'} <Br>
            checked={checked}-если радио-баттон выбран <Br>
            label={'лейбл для радио-баттона'} <Br>
            onClick={'Что будет делать радио-баттон при нажатии'} </code>
        <Radio name={'RadioButton'} checked={checked} label={'Radio Button'}></Radio>

        <code>  <TextArea type='text' label={'Text Area'} value={'text here...'} onChange={onChange}></TextArea><Br>
            type='тип(текст, описание и др.)' <Br>
            label={'лейбл для текстового поля'} <Br>
            value={'надпись текстового поля по-умолчанию'} <Br>
            onChange={'Что будет делать текстовое поле при нажатии'} </code>
        <TextArea type='text' label={'Text Area'} value={'text here...'} ></TextArea>

        <code>   <Select label={'Select Form'} value={'Value 1'} onChange={onChange}></Select><Br>
            label={'лейбл для селектора'} <Br>
            value={'название селектора'} <Br>
            onChange={'Что будет делать селект при выборе опции'} <Br>
            в options нужно передать массив! опций </code>
        <Select label={'Select Form'} value={'Value 1'}></Select>

        <code> <CheckBox name={'CheckBox'} checked={checked} label={'CheckBox'} onClick={onClick}></CheckBox><Br>
            name={'имя чекбокса'} <Br>
            checked={checked}-если чекбокс выбран <Br>
            label={'лейбл для чекбокса'} <Br>
            onClick={'Что будет делать чекбокс при нажатии'} </code>
        <CheckBox name={'CheckBox'} checked={checked} label={'CheckBox'}></CheckBox>

    </div>);
}

export default DocumentationPage