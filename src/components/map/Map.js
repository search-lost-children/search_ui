import GoogleMapReact from 'google-map-react';
import {useEffect, useState} from "react";

const defaultPolyline = {
    path: [],
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
}

export default function Map (props) {
    const [map, setMap] = useState()
    const [maps, setMaps] = useState()
    const [paths, setPaths] = useState([])
    const [polygon, setPolygon] = useState()
    const [markers, setMarkers] = useState([])

    const mapProps = {
        defaultZoom: 11,
        defaultCenter: {
            lat: 48.4647,
            lng: 35.0462
        },
        ...props.map,
    }
    // const key = 'AIzaSyC4kaVTkqLRAYU3vgGa_KNcjzDBF-R7SVo';//this is not valid key :)
    useEffect(()=> {
        markers.forEach(marker => {
            marker.setMap(null)
        })
        if (map && props.markers && props.markers.length) {
            const _markers = props.markers.map((markerInfo, i)=> {
                const marker = new maps.Marker({map, position: {
                        lat: parseFloat(markerInfo.lat),
                        lng: parseFloat(markerInfo.lng)
                    }})

                if(markerInfo.infoWindow) {
                    const dialog = new maps.InfoWindow({
                        content: markerInfo.infoWindow.content
                    });
                    maps.event.addListener(marker, "click", function (e) { dialog.open(map, this); });


                }

                return marker
            })
            setMarkers(_markers)
        }
    }, [props.markers])

    useEffect(()=> {
        if (map && props.pathes) {
            const _paths = []
            paths.forEach((path) => {
                path.path.setMap(null)
            })
            props.pathes.forEach((polyOrPath) => {
                let poly;
                if(Array.isArray(polyOrPath)) {
                    poly = {
                        ...defaultPolyline,
                        path: polyOrPath
                    }
                } else {
                    poly = {
                        ...defaultPolyline,
                        ...polyOrPath
                    }
                }
                const line = new maps.Polyline(poly);

                line.setMap(map)
                _paths.push({
                    path: line
                });
            })
            setPaths(_paths)
        } else {
            paths.forEach((path) => {
                path.path.setMap(null)
            })
        }
    }, [props.pathes])

    useEffect(()=> {
        if (map && props.square) {
            if (polygon) {
                polygon.setMap(null)
            }
            const poly = new maps.Polygon({
                paths: props.square,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });

            poly.setMap(map);
            setPolygon(poly)
        } else {
            if (polygon) {
                polygon.setMap(null)
            }
        }
    },[props.square])

    function handleApiLoaded(_map, _maps) {
        setMap(_map);
        setMaps(_maps);

    }
    return <div id={'map'} style={props.dim}>
        <GoogleMapReact
            bootstrapURLKeys={{key: ''}}
            {...mapProps}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        </GoogleMapReact>
    </div>
};