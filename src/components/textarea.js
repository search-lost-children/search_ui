import './textarea.css'

function TextArea(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onTextAreaChange(element)
    }

    return (
        <div className="textAreaForm">
            <label>
                {props.label}
                <textarea type={props.type} onChange={onChange} value={props.value}></textarea>
            </label>
        </div>
    );
}
export default TextArea;