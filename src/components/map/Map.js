import GoogleMapReact from 'google-map-react';

export default function Map (props) {
    const debounce = (delay) => {
        let timer;
        let lastClick;
        return (coord) => {
            if (!props.map) return;
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
    const key = 'AIzaSyC4kaVTkqLRAYU3vgGa_KNcjzDBF-R7SVo';//this is not valid key :)
    return <div style={props.dim}>
        <GoogleMapReact
            bootstrapURLKeys={{key: ''}}
            {...map}
            yesIWantToUseGoogleMapApiInternals
        >

        </GoogleMapReact>
    </div>
};