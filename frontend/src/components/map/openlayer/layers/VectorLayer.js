import React, { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({show, source, style, zIndex = 0}) => {  
    
    const { map } = useContext(MapContext);  
    const [layer, setLayer] = useState(new OLVectorLayer({source,style}));
    
    useEffect(() => {
        if (!map) return;
        
        layer.setZIndex(zIndex);
        map.addLayer(layer);
        
        return () => {
            if (map) {
                map.removeLayer(layer);
            }
        };
    }, [map]);  
    
    useEffect(() => {
        if(!layer) return;
        layer.setVisible(show);
        
    }, [show]);
 
    return (<React.Fragment/>);
};

export default VectorLayer;