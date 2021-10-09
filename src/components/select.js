import './select.css'

function Select(props) {
    function onChange(event) {
        const element = event.target.value;
        props.onSelectChange(element)
    }
    const {options} = props;
    const makeOptions = function(name) {
        return <option>{name}</option>;
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