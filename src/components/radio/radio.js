import './radio.css'

function Radio(props) {

    function onClick(event) {
        props.onChange(event.target.value)
    }

    return (
        <div className="radioForm">
            <label>
                {props.label}
            <input type="radio" value={props.value} onClick={onClick} name={props.name} checked={props.checked}></input>
            </label>
        </div>
    );
}

export default Radio;