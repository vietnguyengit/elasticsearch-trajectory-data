import React, { useEffect, useState } from 'react';
//import MapPanel from '../../map/google/MapPanel';
//import MapPanel from '../../map/openlayer/MapPanel';
import MapPanel from '../../map/maplibre/MapPanel';
import MapResult from './MapResult';
import { Grid } from "@material-ui/core";
import styles from './Search.module.css';
// import search from '../../../api/opensearch';
// import search from '../../../api/geonetwork-search';
import search from '../../../api/elastic-search';
import AppConstant from '../../../common/Constant';

const TabPanel = (props) => {

    const { value, index } = props;

    const [depthRange, setDepthRange] = useState(AppConstant.MAP.DEFAULT_DEPTH);

    const [timeRange, setTimeRange] = useState({
        // Just a date that is old enough to cover all data
        from: null,
        to: null
    });
    // Either a retangle or a polygon
    const [searchArea, setSearchArea] = useState({
        northEast: null,
        southWest: null,
        polygon: null
    });

    const [searchResult, setSearchResult] = useState({
        hits: null
    });

    const [polygons, setPolygons] = useState(null);
    
    useEffect(() => {

        // Clear any polygon area
        setPolygons(null);

        search
            .spatialQuery(
                (searchArea.southWest === null ? null : searchArea.southWest.lng()),
                (searchArea.northEast === null ? null : searchArea.northEast.lng()), 
                (searchArea.southWest === null ? null : searchArea.southWest.lat()), 
                (searchArea.northEast === null ? null : searchArea.northEast.lat()), 
                (searchArea.polygon === null ? null : searchArea.polygon), 
                timeRange, depthRange)
            .then((response) => {
                if (response.ok && !response.time_out) {
                    return response.json();
                }
                else {
                    // TODO: show error on timeout
                    return null;
                }
            })
            .then((raw) => {
                if (raw !== null) {
                    setSearchResult({
                        hits: search.transform(raw.hits).hits
                    })
                }

                return raw;
            })
            .catch((error) => {
                // TODO: Handle error
            });
    }, [searchArea, timeRange, depthRange]);

    return (
        <React.Fragment>
            {value === index &&
                <Grid container className={styles.tabpanel__container}>
                    <Grid item xs={3}>
                        <MapResult 
                            data={searchResult} 
                            setPolygons={setPolygons} 
                            timeRange={[timeRange, setTimeRange]} 
                            depthRange={[ depthRange, setDepthRange ]}
                            contentHeight={props.contentHeight} />
                    </Grid>
                    <Grid item xs={9}><MapPanel data={searchResult} spatial_extent={polygons} setSearchArea={setSearchArea} /></Grid>
                </Grid>
            }
        </React.Fragment>
    );
}

export default TabPanel;