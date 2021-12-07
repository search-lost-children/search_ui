import './textarea.css'
import TextField from '@material-ui/core/TextField';

function TextArea(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onChange(element)
    }

    return (
        <div className="textAreaForm">
                <TextField multiline rows={3} variant="outlined" label={props.label} value={props.value} onChange={onChange}></TextField>
        </div>
    );
}
export default TextArea;