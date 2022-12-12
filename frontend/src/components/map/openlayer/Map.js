// Reference : https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744

import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

const Map = (props) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    
    // on component mount  
    useEffect(() => { 
        let options = { 
            view: new ol.View({ zoom: props.zoom, center: [props.center.lat , props.center.lng] }), 
            layers: [], 
            controls: [], 
            overlays: [] }; 
            
        let mapObject = new ol.Map(options); 
        mapObject.setTarget(mapRef.current); 
        setMap(mapObject); 
        
        return () => mapObject.setTarget(undefined); 
    }, []);  
    
    // zoom change handler  
    useEffect(() => {    
        if (!map) return;    
        map.getView().setZoom(props.zoom);  
    }, [props.zoom]);  
    
    // center change handler  
    useEffect(() => {    
        if (!map) return;    
        map.getView().setCenter([props.center.lat, props.center.lng])  
    }, [props.center]);  
    
    return (    
        <MapContext.Provider value={{ map }}>      
            <div ref={mapRef} className="ol-map">        
                {props.children}      
            </div>    
        </MapContext.Provider>
    );
}

export default Map;