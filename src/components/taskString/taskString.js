function taskString(taskLabel, taskType) {
    let color

    if (taskType === "solo") {
        let color = "aqua"
        let type = "Индивидуальное"
    } else {
        let color = "green"
        let type = "Групповое"
    }
    return (
        <div>
            <div className={}>   {taskLabel}   </div>
         <div className={}><font color={color}>   {type}   </font></div>
        </div>)
}





