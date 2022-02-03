import Popup from "reactjs-popup";
import Button from "../button/button";
import React from 'react';
import './ModalWindow.css';

function ModalWindow(props) {
     return (
        <div className="modalForm">
            <Popup trigger={props.trigger}  modal nested>
                {close => (
                    <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> {props.title} </div>
                    <div className="content">
                        {props.children}
                    </div>
                        { props.actions ? (
                            <div className="actions">
                                <props.actions close={close}></props.actions>
                            </div>
                        ) :null }

                </div>)}
            </Popup>
        </div>
    );
}

export default ModalWindow;