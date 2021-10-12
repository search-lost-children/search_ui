import './input.css'

function Input(props) {
    function onChange(event) {
        const value = event.target.value;
        props.onChange(value)
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