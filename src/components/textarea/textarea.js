import './textarea.css'
import TextField from '@mui/material/TextField';

function TextArea(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onChange(element)
    }

    return (
        <div className="textAreaForm">
            <TextField multiline rows={3} variant="outlined"
                       disabled={props.disabled}
                       label={props.label}
                       value={props.value}
                       style={props.style}
                       onChange={onChange}>
            </TextField>
        </div>
    );
}

export default TextArea;