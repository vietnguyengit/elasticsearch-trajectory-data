import React, { useEffect, useState } from 'react';
import AppConstant from '../../../common/Constant';
import Map from './Map'
import NavigationControl from './controls/NavigationControl';
import ScaleControl from './controls/ScaleControl';
import { Controls } from '../openlayer/control';
import MapboxDrawControl from './controls/MapboxDrawControl';
import StaticMarkers from './layers/StaticMarkers';

const MapPanel = (props) => {
    const { value, index, data } = props;
    const [markers, setMarkers] = useState(null);

    const onSearchAreaChange = (e) => {
        props.setSearchArea((prev) => {
            // TODO: You can draw multiply polygon with maplibre, you should remember previous 
            // one, but it is ok as demo for now.
            return {...prev, polygon: e.features[0].geometry.coordinates}
        });
    }

    useEffect(() => {
        if(data === null || data.hits === null || data.hits.length === 0) return; 

        const sm = [];

        // Translate the data to something the static markers know
        data.hits.forEach((value) => {
            sm.push({
                title: value._source.uuid,
                location: value._source.location
            });
        });
        setMarkers(sm);

    }, [data]);

    return (
        // Important! Always set the container height explicitly
        <React.Fragment>
            {value === index &&
                <Map 
                    zoom = {AppConstant.MAP.DEFAULT_ZOOM}
                    centerLongitude = {AppConstant.MAP.DEFAULT_LOCATION.lng}
                    centerLatitude = {AppConstant.MAP.DEFAULT_LOCATION.lat}>
                    <Controls>
                        <NavigationControl/>
                        <ScaleControl/>
                        <StaticMarkers markers={markers} />
                        <MapboxDrawControl 
                            onDrawCreate={onSearchAreaChange} 
                            onDrawUpdate={onSearchAreaChange}
                            onDrawDelete={onSearchAreaChange}
                        />
                    </Controls>
                </Map>
            }
        </React.Fragment>
    );
}

export default MapPanel;