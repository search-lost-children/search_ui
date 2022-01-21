import './input.css'
import TextField from '@mui/material/TextField';

function Input(props) {
    function onChange(event) {
        let value = event.target.value;
        if (props.type ==='file') {
            value = event.target.files
        }
        props.onChange(value)
    }

    return (
        <div className="inputForm">
            <TextField
                id="outlined-basic"
                disabled={props.disabled}
                type={props.type}
                label={props.label}
                value={props.value}
                onChange={onChange}
                variant="outlined"
                InputLabelProps={{ shrink: props.shrink }}>
            </TextField>
        </div>
    );
}

export default Input;