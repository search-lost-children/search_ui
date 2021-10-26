import Button from "../../components/button/button";
import Select from "../../components/select/select";
import React, {useState} from "react";
import './searchSquad.css'
import FinalSquad from "./FinalSquad";

function SearchSquad() {

    let listOfNames = [{label: 'Select', value: ''}, {label: 'James', value: 'James'}, {
        label: 'Robert',
        value: 'Robert'
    }, {label: 'John', value: 'John'}, {label: 'Michael', value: 'Michael'}, {label: 'William', value: 'William'}];
    let coordinators = [{label: 'Select', value: ''}, {label: 'Mick', value: 'Mick'}, {
        label: 'Karl',
        value: 'Karl'
    }, {label: 'Bob', value: 'Bob'}]

    const [select, setSelect] = useState('');
    const [names, setNames] = useState([]);
    const [coordinator, setCoordinator] = useState('');
    const [finalNames, setFinalNames] = useState([]);
    const [finalCoordinator, setFinalCoordinator] = useState('')

    function choseName(value) {
        setSelect(value)
        console.log(value)
    }

    function addSelected() {
        if (!select) {
            return;
        }
        if (names.some(name => name === select)) {
            return;
        }
        const newArray = [...names]
        newArray.push(select)
        setNames(newArray)
        console.log(select)
    }

    function deleteName(name) {
        let newArray = [...names.filter(element => element !== name)];
        setNames(newArray)
    }

    function chooseCoordinator(value) {
        setCoordinator(value)
    }

    function saveSquad() {
        setFinalNames([...names])
        setFinalCoordinator(coordinator)
    }

    function deleteFinalSquad() {
        setFinalNames([])
        setFinalCoordinator('')

    }

    return (
        <div className='all-wrapper'>
            <div className='search-header'>
                <h2>Отряды поиска ФИО</h2>
                <div className='wrapper-inputs'>
                    <div className='left-side'>
                        <Select label={'Учасник группы'} options={listOfNames} value={select} onChange={choseName}>
                        </Select>
                        <Button onClick={addSelected} value='Добавить в группу'/>
                    </div>
                    <Select label={'Координатор'} options={coordinators} value={coordinator}
                            onChange={chooseCoordinator}>
                    </Select>
                </div>

                <table>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    {names.map(name => <tr>
                        <td>{name}</td>
                        <td>
                            <button onClick={() => deleteName(name)}>Удалить</button>
                        </td>
                    </tr>)}
                </table>
                <div className='save'>
                    <Button onClick={saveSquad} value='Сохранить'/>
                </div>
            </div>
            <div className='main-content'>
                <FinalSquad names={finalNames} coordinator={finalCoordinator} onClick={deleteFinalSquad}/>
            </div>
        </div>
    )
}

export default SearchSquad