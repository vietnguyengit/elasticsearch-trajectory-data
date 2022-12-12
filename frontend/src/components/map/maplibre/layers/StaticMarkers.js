import React, { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import maplibregl from 'maplibre-gl'

// Default filter is non filter.
const StaticMarkers = ({ markers, selector = (f) => true, color = ''}) => {

    const { map } = useContext(MapContext);  

    useEffect(() => {
        if(!map || markers === null || markers.length === 0) return;

        let ms = [];

        markers.filter(selector).forEach(element => {

            const m = new maplibregl.Marker({
                draggable: false,
                title: element.title
            });

            m.getElement().addEventListener('click', (e) => { e.preventDefault(); console.log('marker clicked') });
            m.setLngLat(element.location)
            m.addTo(map);
            ms.push(m);
        });

        return () => {
            ms.forEach(e => {
                e.remove(map);
            });
            ms = [];
        }

    }, [markers])

    return (<React.Fragment/>);
}

export default StaticMarkers