import './checkbox.css'
import UiCheckBox from '@material-ui/core/Checkbox';

function CheckBox(props) {

    function onChange(event) {
        props.onChange(event.target.checked)
    }

    return (
        <div className="checkBoxForm">
            <label>
                {props.label}
                <UiCheckBox
                    disabled={props.disabled}
                    onChange={onChange}
                    checked={props.checked}
                    color="primary">
                </UiCheckBox>
            </label>
        </div>
    );
}

export default CheckBox;