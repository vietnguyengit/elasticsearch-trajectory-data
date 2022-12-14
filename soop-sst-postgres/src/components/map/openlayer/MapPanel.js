import React, {useState} from 'react';
import AppConstant from '../../../common/Constant';
import Map from './Map'
import { xyz, vector, osm } from "./basemap";
import { Controls, FullScreenControl, ZoomControl, MousePositionControl, ButtonControl} from './control'
import { DrawLayer, Layers, TileLayer } from "./layers";
import { Create } from '@material-ui/icons';

const MapPanel = (props) => {

    const { value, index } = props;
    const [showDrawingLayer, setShowDrawingLayer] = useState(true);

    const layerButtonClick = (event) => {
        setShowDrawingLayer((value) => !value);
    }

    return (
        // Important! Always set the container height explicitly
        <React.Fragment>
            {value === index &&
                <Map
                    zoom={AppConstant.MAP.DEFAULT_ZOOM}
                    center={AppConstant.MAP.DEFAULT_LOCATION} >
                    <Layers>
                        <TileLayer zIndex={0} source={osm()} />
                        <DrawLayer show = {showDrawingLayer}/>
                    </Layers>
                    <Controls>
                        <ButtonControl handleButtonClick={layerButtonClick}>
                            <Create/>
                        </ButtonControl>    
                        <MousePositionControl />
                        <FullScreenControl />      
                        <ZoomControl/>
                    </Controls>
                </Map>
            }
        </React.Fragment>
    );
}

export default MapPanel;