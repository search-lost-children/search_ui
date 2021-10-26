import './FinalSquad.css'
import {useState} from "react";

function FinalSquad(props) {
    const [isHidden, setHidden] = useState(false)
    return (
        <div className='wrapper'>
            <div className='header'>
                <span onClick={() => setHidden(!isHidden)}>Кординатор: {props.coordinator}</span>
                <span>Учасников: {props.names.length}</span>
            </div>
            <div className={isHidden ? 'hidden' : ''}>
                <table className='final-table'>
                    <tr>
                        <th>Name</th>
                    </tr>
                    {props.names.map((name) => <tr>
                        <td>{name}</td>
                    </tr>)}
                </table>
                <button onClick={props.onClick} className='deleteBtn'>Удалить</button>
            </div>

        </div>
    )
}

export default FinalSquad