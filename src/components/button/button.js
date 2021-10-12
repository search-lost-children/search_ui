import './button.css'

function Button(props) {

    function onClick() {
        props.onClick()
    }

    return (
        <div className="buttonForm">
            <input className="button" type="button" onClick={onClick} value={props.value}></input>
        </div>
    );
}

export default Button;