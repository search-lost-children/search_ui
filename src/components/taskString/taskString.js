import Radio from "../radio/radio"
import React, {useState} from "react";
import {useRouteMatch} from "react-router-dom";

function TaskString(props) {
    let color
    let taskTypeLabel
    let match = useRouteMatch()
    const id = match.params.id
    const [radioValue, setRadioValue] = useState("Показать данные на карте")

    function depsDefining(typeDep){
        let deps
        if (typeDep === "solo") {
            deps = {
                color: "aqua",
                taskTypeLabel: "Индивидуальное",
            }
        } else {
            deps = {
                color: "green",
                taskTypeLabel: "Групповое",
            }
        }
        return deps
    }

    let taskRenderDeps = depsDefining(props.type)

    function changeLabel (value){
        if(value === "Показать данные на карте"){
            setRadioValue("Маршрут выведен на карту")
        } else {
            setRadioValue("Показать данные на карте")
        }
    }
    return (
        <div>
            <div>{props.label}</div>
            <div><font color={taskRenderDeps.color}>{taskRenderDeps.taskTypeLabel}</font></div>
            <div>
                <Radio
                    value={radioValue}
                    onChange={() => {
                        changeLabel()
                    }}
                    label={'Показать на карте'}
                    name={'RadioButton'}
                    /*cheched={сюда функция нужна для вывода координат на карту. сделать не могу тк не знаю как работать с картой}*//>
            </div>
        </div>)
}

export default TaskString










{/*<Button*/}
{/*    onClick = {() => {*/}
{/*        // also тут должна быть функция, которая будет передавать координаты на карту для отрисовки маршрута*/}
{/*        setButtonValue("В процессе...")*/}
{/*        setButtonStatus(true)*/}
{/*    }}*/}
{/*    value={buttonValue}*/}
{/*    disabled={buttonStatus}>*/}
{/*</Button>*/}