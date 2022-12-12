import React, { useContext, useEffect } from "react";
import { Zoom } from "ol/control";
import MapContext from "../MapContext";

const ZoomControl = (props) => {  
    const { map } = useContext(MapContext);  
    
    useEffect(() => {    
        if (!map) return;    
        
        const control = new Zoom(props.options ? props.options : {});
        map.controls.push(control);    

        return () => map.controls.remove(control);  
    }, [map]);

  return (<React.Fragment/>);
};

export default ZoomControl;