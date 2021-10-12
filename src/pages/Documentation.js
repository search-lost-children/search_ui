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

        <code> <Input type='login' label={'Login'} value={props.value} onChange={onChange}></Input>
            type='тип(текст, логин, пароль и др.)'
            label={'лейбл для инпута'}
            value={'надпись внутри инпута по-умолчанию'}
            onChange={'Что будет делать инпут при нажатии'}</code>
        <Input type='login' label={'Login'}></Input>

        <code> <Button value={'PUSH ME'} onClick={onClick}></Button>
            value={'надпись внутри кнопки'}
            label={'лейбл для кнопки'}
            onClick={'Что будет делать кнопка при нажатии'} </code>
        <Button value={'PUSH ME'}></Button>

        <code> <Radio name={'RadioButton'} checked={checked} label={'Radio Button'} onClick={onClick}></Radio>
            name={'имя радио-баттона'}
            checked={checked}-если радио-баттон выбран
            label={'лейбл для радио-баттона'}
            onClick={'Что будет делать радио-баттон при нажатии'} </code>
        <Radio name={'RadioButton'} checked={checked} label={'Radio Button'}></Radio>

        <code>  <TextArea type='text' label={'Text Area'} value={'text here...'} onChange={onChange}></TextArea>
            type='тип(текст, описание и др.)'
            label={'лейбл для текстового поля'}
            value={'надпись текстового поля по-умолчанию'}
            onChange={'Что будет делать текстовое поле при нажатии'} </code>
        <TextArea type='text' label={'Text Area'} value={'text here...'} ></TextArea>

        <code>   <Select label={'Select Form'} value={'Value 1'} options={[{name: "option1"}]} onChange={onChange}> </Select>
            label={'лейбл для селектора'}
            value={'название селектора'}
            options={[{name: "option1"}]} - в options нужно передать массив! обьектов-опций
            onChange={'Что будет делать селект при выборе опции'} </code>
        <Select label={'Select Form'} value={'Value 1'}></Select>

        <code> <CheckBox name={'CheckBox'} checked={checked} label={'CheckBox'} onClick={onClick}></CheckBox>
            name={'имя чекбокса'}
            checked={checked}-если чекбокс выбран
            label={'лейбл для чекбокса'}
            onClick={'Что будет делать чекбокс при нажатии'} </code>
        <CheckBox name={'CheckBox'} checked={checked} label={'CheckBox'}></CheckBox>

    </div>);
}

export default DocumentationPage