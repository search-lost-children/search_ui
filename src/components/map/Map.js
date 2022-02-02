import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";
import {useEffect, useRef, useState} from "react";

export default function Map (props) {
    const [map, setMap] = useState()
    const [maps, setMaps] = useState()
    const [paths, setPaths] = useState([])
    const [polygon, setPolygon] = useState()

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
                timer = setTimeout(() => props.map.onClick(coord), delay)
            }
        }
    }

    const mapProps = {
        defaultZoom: 11,
        defaultCenter: {
            lat: 48.4647,
            lng: 35.0462
        },
        ...props.map,
    }
    const key = 'AIzaSyC4kaVTkqLRAYU3vgGa_KNcjzDBF-R7SVo';//this is not valid key :)
    useEffect(()=> {
        if (map && props.markers && props.markers.length) {
            props.markers.map((coords, i)=> {
                new maps.Marker({map, position:{
                    lat:coords.lat,
                    lng: coords.lng
                }})
            })
        }
    }, [props.markers])

    useEffect(()=> {
        if (map && props.pathes) {
            const _paths = []
            paths.forEach((path) => {
                path.path.setMap(null)
            })
            props.pathes.forEach((path) => {
                const line = new maps.Polyline({
                    path: path,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });

                line.setMap(map)
                _paths.push({
                    path: line,
                    origPath: path
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
            debugger
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