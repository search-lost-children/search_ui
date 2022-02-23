import MapIcon from "@mui/icons-material/Map";
import Map from "../../components/map/Map";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import React, {useState} from "react";
import Button from "../../components/button/button";

function MapInModal(props) {
    const [coords, setCoords] = useState();
    function Actions ({close}) {
        return (<div>
            <Button disabled={!coords} value={'Применить'} onClick={() => {
                close()
                props.onApply(coords)
            }} ></Button>
            <Button color={'warning'} onClick={() => {
                close()
            }} value={'Отменить'}></Button>
        </div>)
    }

    const mapSettings = {
        onClick: (_coords) => {
            setCoords({
                lat: _coords.lat,
                lng: _coords.lng
            })
        }
    }
    return (<ModalWindow
        trigger={<MapIcon ></MapIcon>}
        title={'Modal Title'}
        actions={Actions}
    >
        <div style={{height: '50vh', width:'50vw'}}>
            <Map markers={coords ? [coords] : undefined} dim={{height: '50vh', width:'50vw'}} map={mapSettings}/>
        </div>

    </ModalWindow>)
}

export default MapInModal