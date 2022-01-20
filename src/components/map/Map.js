import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polyline} from "react-google-maps"
import { compose, withProps } from "recompose"


const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={props.defaultCenter}
    >
        {props.children}
    </GoogleMap>
)

export default Map;