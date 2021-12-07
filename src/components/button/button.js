import './button.css';
import UiButton from '@material-ui/core/Button';

function Button(props) {
    const variant = (props.variant ? (props.variant) : "outlined")

    function onClick() {
        props.onClick()
    }

    return (
        <div className="buttonForm">
            <UiButton disabled={props.disabled} variant={variant} onClick={onClick}>{props.value}</UiButton>
        </div>
    );
}

export default Button;