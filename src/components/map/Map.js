// import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polyline} from "react-google-maps"
// import { compose, withProps } from "recompose"
import GoogleMapReact from 'google-map-react';


// const Map = compose(
//     withProps({
//         bootstrapURLKeys: {key: 'AIzaSyC4kaVTkqLRAYU3vgGa_KNcjzDBF-R7SVo'},
//         googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `100%` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
// )((props) =>
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={props.defaultCenter}
//     >
//         {props.children}
//     </GoogleMap>
// defaultCenter={{
//     lat: 59.95,
//         lng: 30.33
// }}
// defaultZoom={11}
// )


export default function Map (props) {
    const debounce = (delay) => {
        let timer;
        let lastClick;
        return (coord) => {
            if (lastClick && (Date.now() - lastClick)  < delay) {
                clearTimeout(timer)
                lastClick = undefined;
                if (props.map.onDblClick) {
                    return props.map.onDblClick(coord)
                }
            }
            lastClick = Date.now();
            if(props.map.onClick) {
                timer = setTimeout(props.map.onClick, delay)
            }
        }
    }

    const map = {
        defaultZoom: 11,
        defaultCenter: {
            lat: 48.4647,
            lng: 35.0462
        },
        ...props.map,
        onClick: debounce(400)
    }
    const key = 'AIzaSyC4kaVTkqLRAYU3vgGa_KNcjzDBF-R7SVo';
    return <div style={props.dim}>
        <GoogleMapReact
            bootstrapURLKeys={{key: ''}}
            {...map}
        />
    </div>
};