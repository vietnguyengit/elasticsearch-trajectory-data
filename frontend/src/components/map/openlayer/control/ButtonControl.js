import React, { useContext, useEffect, useRef } from "react";
import MapContext from "../MapContext";
import { Control } from 'ol/control';

class ButtonControlClass extends Control {

    constructor(button, opt_options) {
        const options = opt_options || {};

        super({
            element: button,
            target: options.target,
        });
    }
}

// React component here
const ButtonControl = (props) => {
    const ref = useRef();
    const { map } = useContext(MapContext);  

    useEffect(() => {
        if (!map) return;

        const button = new ButtonControlClass(ref.current);
        button.setTarget();

        map.controls.push(button);

        return () => map.controls.remove(button);

    }, [map]);

    return(
        <div ref = {ref} onClick={props.handleButtonClick}>
            {props.children}
        </div>
    );
}

export default ButtonControl;