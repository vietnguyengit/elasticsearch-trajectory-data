import React, { useContext, useEffect } from "react";
import { FullScreen } from "ol/control";
import MapContext from "../MapContext";

const FullScreenControl = (props) => {  
    const { map } = useContext(MapContext);  
    
    useEffect(() => {    
        if (!map) return;    
        
        const fullScreenControl = new FullScreen(props.options ? props.options : {});
        map.controls.push(fullScreenControl);    

        return () => map.controls.remove(fullScreenControl);  
    }, [map]);

  return (<React.Fragment/>);
};

export default FullScreenControl;