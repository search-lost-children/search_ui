import './checkbox.css'
import UiCheckBox from '@mui/material/Checkbox';

function CheckBox(props) {

    function onChange(event) {
        props.onChange(event.target.checked)
    }

    return (
        <div className="checkBoxForm">
            <label>
                <UiCheckBox
                    disabled={props.disabled}
                    onChange={onChange}
                    checked={props.checked}
                    color="primary">
                </UiCheckBox>
                {props.label}
            </label>
        </div>
    );
}

export default CheckBox;