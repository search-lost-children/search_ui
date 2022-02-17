import Button from "../button/button";
import {useState} from "react";
import {useRouteMatch} from "react-router-dom";

function TaskString(props) {
    let color
    let taskTypeLabel
    let match = useRouteMatch()
    const id = match.params.id
    const [buttonStatus, setButtonStatus] = useState(false)
    const [buttonValue, setButtonValue] = useState("Начать")

    function damnWTFIsThis(typeDep){
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

    let taskRenderDeps = damnWTFIsThis(props.type)


    return (
        <div>
            <div>{props.label}</div>
            <div><font color={taskRenderDeps.color}>{taskRenderDeps.taskTypeLabel}</font></div>
            <div>
                <Button
                    onClick = {() => {
                        // also тут должна быть функция, которая будет передавать координаты на карту для отрисовки маршрута
                        setButtonValue("В процессе...")
                        setButtonStatus(true)
                    }}
                    value={buttonValue}
                    disabled={buttonStatus}>
                </Button>
            </div>
        </div>)
}

export default TaskString