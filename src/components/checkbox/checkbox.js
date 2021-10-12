import './checkbox.css'

function CheckBox(props) {

    function onClick() {
        props.onChange()
    }

    return (
        <div className="checkBoxForm">
            <label>
                {props.label}
                <input type="checkbox" onClick={onClick} name={props.name} checked={props.checked}></input>
            </label>
        </div>
    );
}

export default CheckBox;