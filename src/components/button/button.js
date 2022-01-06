import './button.css';
import UiButton from '@mui/material/Button';

function Button(props) {
    const variant = (props.variant ? (props.variant) : "outlined")
    const color = (props.color ? (props.color) : "primary")

    function onClick() {
        props.onClick()
    }

    return (
        <div className="buttonForm">
            <UiButton
                disabled={props.disabled}
                variant={variant}
                color={color}
                onClick={onClick}
            >
                {props.value}
            </UiButton>
        </div>
    );
}

export default Button;