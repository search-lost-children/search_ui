import './input.css'

function Input(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onInputChange(element)
    }

    return (
        <div className="inputForm">
            <label>
                {props.label}
                <input type={props.type} value={props.value} onChange={onChange}></input>
            </label>
        </div>
    );
}
export default Input;