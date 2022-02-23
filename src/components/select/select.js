import './select.css'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {MenuItem, Select} from "@mui/material";

function uiSelect(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onChange(element)
    }

    const options = props.options || [];
    const makeOptions = function (el) {
        return <MenuItem key={el.value} value={el.value}>{el.label}</MenuItem>;
    };
    return (
        <div className="selectForm">
            <FormControl>
                <InputLabel>{props.label}</InputLabel>
                <Select
                    sx={{ minWidth: 150 }}
                    disabled={props.disabled}
                    value={props.value}
                    onChange={onChange}>
                    {options.map(makeOptions)}
                </Select>
            </FormControl>
        </div>
    );
}

export default uiSelect;