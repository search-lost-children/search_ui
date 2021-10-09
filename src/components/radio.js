import './radio.css'

function Radio(props) {

    function onClick() {
        props.onRadioClick()
    }

    return (
        <div className="radioForm">
            <label>
                {props.label}
            <input id="radiobutton" type="radio" onClick={onClick} name={props.name} checked={props.checked}></input>
            </label>
        </div>
    );
}

export default Radio;