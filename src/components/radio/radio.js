import './radio.css'
import UIRadio from '@material-ui/core/Radio';

function Radio(props) {

    function onChange(event) {
        props.onChange(event.target.value)
    }

    return (
        <div className="radioForm">
            <label>
                {props.label}
                <UIRadio
                    color="primary"
                    disabled={props.disabled}
                    value={props.value}
                    onChange={onChange}
                    name={props.name}
                    checked={props.checked}>
                </UIRadio>
            </label>
        </div>
    );
}

export default Radio;