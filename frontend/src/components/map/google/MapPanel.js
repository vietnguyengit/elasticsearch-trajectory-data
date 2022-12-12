import React, { useEffect, useState } from "react";
import AppConstant from "../../../common/Constant";
import Map from './Map';

const MapPanel = (props) => {

    const { value, index } = props;

    const [mapInstance, setMapInstance] = useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null
    });

    const apiHasLoaded = (map, maps) => {
        if (maps) {
            setMapInstance({
                mapApi: maps,
                mapInstance: map,
                mapApiLoaded: true
            });
            // Do not use mapInstance here, the setMapInstance is scheduled call
            // and may not have value immediately
            createSearchAreaBox(map, maps);
        }
    }
    /*
        Use to handle user wants to display the area related to the 
        research. You can also use it to verify if your selected area
        fall under your area box
    */
    useEffect(() => {
        const se = props.spatial_extent;
        const polygonObj = [];

        if (mapInstance.mapApiLoaded && se !== null && se.type === AppConstant.MAP.MULTI_POLYGON) {

            for (var k = 0; k < se.coordinates.length; k++) {
                const coordinates = se.coordinates[k];

                for (var i = 0; i < coordinates.length; i++) {
                    let polygons = coordinates[i];
                    const latLngs = [];
                    // https://stackoverflow.com/questions/27858412/google-maps-rendering-inverse-of-counter-clockwise-oriented-polygons
                    // google map render -180 --> 180 have issue, so some output is just a line for now due to map issue
                    // if you want to work, you need a 0 point to guide the map.
                    //     new google.maps.LatLng(-55, 180),
                    //     new google.maps.LatLng(-33, 180),
                    //     new google.maps.LatLng(-33, 0),
                    //     new google.maps.LatLng(-33, -180),
                    //     new google.maps.LatLng(-55, -180),
                    //     new google.maps.LatLng(-55, 0)
                    for (var p = 0; p < polygons.length; p++) {
                        // GeoJson use (lng, lat), hence we need to flip it here as google
                        // map use (lat, lng)
                        latLngs.push(new mapInstance.mapApi.LatLng(polygons[p][1], polygons[p][0]));
                    }

                    // Draw polygon here
                    polygonObj.push(new mapInstance.mapApi.Polygon({
                        map: mapInstance.mapInstance,
                        path: latLngs,
                        zIndex: AppConstant.MAP.POLYGON_AREA_ZINDEX
                    }));
                }
            }

            return (() => {
                // Clear all polygon before next draw starts
                // check useEffect return usage if you are not sure
                while (polygonObj.length > 0) {
                    // Clear and set the map to null
                    polygonObj.pop().setMap(null);
                }
            });
        }
    }, [props.spatial_extent, mapInstance]);

    /*
        We create an area box, dragable after the map creates, 
        if we put marker as component, it will become static and not
        dragable
    */
    const createSearchAreaBox = (map, maps) => {
        const area = new maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.25,
            editable: true,
            geodesic: true, // A geodesic polygon will retain its true geographic shape when it is moved
            map,
            bounds: {
                north: AppConstant.MAP.DEFAULT_LOCATION.lat + AppConstant.MAP.SEARCH_AREA_SIZE,
                south: AppConstant.MAP.DEFAULT_LOCATION.lat - AppConstant.MAP.SEARCH_AREA_SIZE,
                east: AppConstant.MAP.DEFAULT_LOCATION.lng + AppConstant.MAP.SEARCH_AREA_SIZE,
                west: AppConstant.MAP.DEFAULT_LOCATION.lng - AppConstant.MAP.SEARCH_AREA_SIZE
            },
            draggable: true,
            zIndex: AppConstant.MAP.SEARCH_BOX_ZINDEX
        });

        area.addListener("dragend", (evet) => {
            // Begin search when user stop the drag
            props.setSearchArea({
                northEast: area.getBounds().getNorthEast(),
                southWest: area.getBounds().getSouthWest()
            });
        });
    }

    return (
        // Important! Always set the container height explicitly
        <React.Fragment>
            {value === index &&
                <Map
                    zoom={AppConstant.MAP.DEFAULT_ZOOM}
                    center={AppConstant.MAP.DEFAULT_LOCATION}
                    bootstrapURLKeys={{
                        key: "AIzaSyDZN_wEcHAl2P2etpUZ9AatisZDPmDKomw",
                        libraries: ['places', 'geometry'],
                        language: 'en'
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                />
            }
        </React.Fragment>
    );
}

export default MapPanel;