import React, {useContext, useEffect, useState} from "react";
import MapContext from "../MapContext";
import AppConstant from "../../../../common/Constant";

const ELASTIC_SOURCE_NAME = 'elastic-vector-tile';
const ELASTIC_SOURCE_LAYER = 'elastic-vector-layer';

const VectorTileLayer = (props) => {
  const { map } = useContext(MapContext);
  const [mapLoaded, setMapLoaded] = useState(null);

  useEffect(() => {
    if (!map) return;

    if(mapLoaded === null) {
      // This situation is map object created, hence not null, but not completely loaded
      // and therefore you will have problem setting source and layer. Set-up a listener
      // to update the state and then this effect can be call again when map loaded.
      map.on('load', () => setMapLoaded(true));
      return;
    }
    if(!mapLoaded) return;

    const vectorTileHandle = () => {

      if(map.getSource(ELASTIC_SOURCE_NAME)) {
        map.removeLayer(ELASTIC_SOURCE_LAYER);
        map.removeSource(ELASTIC_SOURCE_NAME);
      }
      // Use this to find the zoom/x/y
      // https://maps.gsi.go.jp/development/tileCoordCheck.html#14/43.0639/141.3542
      // If you use url then the return must be GeoJson
      // If you use tiles, then return must be pdb (protobuffer)
      const s = {
        type: 'vector',
        tiles: [`http://ec2-54-253-84-18.ap-southeast-2.compute.amazonaws.com:81/${AppConstant.ELASTICSEARCH_URL}_mvt/geoPolygon/{z}/{x}/{y}`]
        // tiles: [`http://localhost:3000/${AppConstant.ELASTICSEARCH_URL}_mvt/geoPolygon/{z}/{x}/{y}`]
      };

      console.log(s);

      map.addSource(ELASTIC_SOURCE_NAME, s);

      map.addLayer({
        id: ELASTIC_SOURCE_LAYER+"LineString",
        type: 'line',
        source: ELASTIC_SOURCE_NAME,
        'source-layer': 'hits',
        'filter': ['==', '$type', 'LineString'],
        'paint': {
          'line-color': '#ff9900'
        }
      });

      map.addLayer({
        id: ELASTIC_SOURCE_LAYER+"Point",
        type: 'circle',
        source: ELASTIC_SOURCE_NAME,
        'source-layer': 'hits',
        'filter': ['==', '$type', 'Point'],
        'paint': {
          // Make circles larger as the user zooms from z12 to z22.
          'circle-radius': {
            'base': 3,
            'stops': [
              [12, 5],
              [22, 10]
            ]
          },
          // Color circles by ethnicity, using a `match` expression.
          'circle-color': '#c72c7f',
          "circle-opacity": 0.4
        }
      });
    }

    vectorTileHandle();

    return () => {
      if(map.getSource(ELASTIC_SOURCE_NAME)) {
        map.removeLayer(ELASTIC_SOURCE_LAYER);
        map.removeSource(ELASTIC_SOURCE_NAME);
      }
    }
  }, [map, mapLoaded]);

  return (<React.Fragment/>);
}

export default VectorTileLayer;