import React, { useRef, useState, useEffect } from 'react'

import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import MapContext from "./MapContext";
import "./Map.css";

const Map = ({
    children,
    centerLongitude = 0,
    centerLatitude = 0,
    zoom = 5,
    stylejson = 'https://demotiles.maplibre.org/style.json'
}) => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        const m = new maplibregl.Map({
            container: mapContainerRef.current,
            style: stylejson,
            center: [centerLongitude, centerLatitude],
            zoom: zoom,
            localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
        });
        setMap(m);
    }, []);

    return (
        <MapContext.Provider value={{ map }}> 
            <div ref={mapContainerRef} className="libre-map">
                {children} 
            </div>
        </MapContext.Provider>
    )
}

export default Map