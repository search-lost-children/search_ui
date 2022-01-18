import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
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
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
         <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
)

export default Map;