import React, { useContext, useEffect, useState } from "react";
import Draw from 'ol/interaction/Draw';
import MapContext from "../MapContext";
import VectorLayer from "./VectorLayer";

import {Vector as VectorSource} from 'ol/source';

const DrawLayer = ({show, type = 'Polygon', style, zIndex = 0}) => {  

    const { map } = useContext(MapContext);  
    const source = new VectorSource({wrapX: false});
    
    useEffect(() => {
        if (!map) return;

        const draw = new Draw({source, type})

        map.addInteraction(draw);

        return () => {
            if(map) {
                map.removeInteraction(draw);
            }
        };
    }, [map, type]);

    return (
        <VectorLayer show={show} source={source} style={style} zIndex={zIndex}/>
    );

}

export default DrawLayer;
