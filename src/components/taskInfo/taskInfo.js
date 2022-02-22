import React, {useState} from "react";
import GroupsIcon from '@mui/icons-material/Groups';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Checkbox from "../checkbox/checkbox";

function TaskInfo(props) {
    const [checked, setChecked] = useState(false)

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{paddingTop: '5px'}}>
                {props.type !== 'individual' ? <GroupsIcon /> : <PermIdentityIcon />}
            </div>
            <Checkbox
                checked={checked}
                onChange={(val) => {
                    setChecked(val)
                    props.onChange(props.id, val)
                }}
                label={'Показать на карте'}
                name={'RadioButton'}
            />
        </div>
    )
}

export default TaskInfo