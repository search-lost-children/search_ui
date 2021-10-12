import './select.css'

function Select(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onSelectChange(element)
    }
    const options = props.options || [];
    const makeOptions = function(name) {
        return <option key={name} value={name}>{name}</option>;
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