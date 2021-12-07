import './input.css'
import TextField from '@material-ui/core/TextField';

function Input(props) {
    function onChange(event) {
        const value = event.target.value;
        props.onChange(value)
    }

    return (
        <div className="inputForm">
                <TextField id="outlined-basic" type={props.type}  label={props.label} value={props.value} onChange={onChange} variant="outlined"></TextField>
        </div>
    );
}
export default Input;