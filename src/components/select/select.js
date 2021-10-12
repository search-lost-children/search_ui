import './select.css'

function Select(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onChange(element)
    }
    const options = props.options || [];
    const makeOptions = function(el) {
        return <option key={el.value} value={el.value}>{el.label}</option>;
    };
    return (
        <div className="selectForm">
            <label>
                {props.label}
                <select onChange={onChange} value={props.value}>
                    {options.map(makeOptions)}
                </select>
            </label>
        </div>
    );
}
export default Select;