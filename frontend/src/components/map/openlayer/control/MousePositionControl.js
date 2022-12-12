import React, { useContext, useEffect } from "react";
import { MousePosition } from "ol/control";
import { createStringXY } from 'ol/coordinate';
import MapContext from "../MapContext";
import AppConstant from "../../../../common/Constant";

const MousePositionControl = ({projection}) => {  
    const { map } = useContext(MapContext);  
    
    useEffect(() => {    
        if (!map) return;    
        
        const control = new MousePosition(
          {
            coordinateFormat: createStringXY(4),
            projection: projection ? projection : AppConstant.MAP.PROJECTION
          });
        
          map.controls.push(control);    

        return () => map.controls.remove(control);  
    }, [map]);

  return (<React.Fragment/>);
};

export default MousePositionControl;