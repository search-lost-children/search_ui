import './select.css'
import UiSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function Select(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onChange(element)
    }

    const options = props.options || [];
    const makeOptions = function (el) {
        return <option key={el.value} value={el.value}>{el.label}</option>;
    };

    return (
        <div className="selectForm">
            <FormControl>
                <InputLabel>{props.label}</InputLabel>
                <UiSelect native
                          disabled={props.disabled}
                          value={props.value}
                          onChange={onChange}>
                    {options.map(makeOptions)}
                </UiSelect>
            </FormControl>
        </div>
    );
}

export default Select;