import React, {useContext, useEffect, useState} from "react";
import MapContext from "../MapContext";

const PolygonLayer = ({name, polygon}) => {
  const { map } = useContext(MapContext);
  const [mapLoaded, setMapLoaded] = useState(null);

  useEffect(() => {
    if (!map) return;

    // This situation is map object created, hence not null, but not completely loaded
    // and therefore you will have problem setting source and layer. Set-up a listener
    // to update the state and then this effect can be call again when map loaded.
    if(mapLoaded === null) {
      map.on('load', () => setMapLoaded(true));
      return;
    }
    if(!mapLoaded) return;

    // Convert the multiple polygon to geojson so make knows how to deal with it
    const geojson = {
      type: 'geojson',
      data: {
        type: "FeatureCollection",
        features: []
      }
    };

    polygon.forEach(v => {
      const f = {
        type: "Feature",
        properties: { name: 'test'},
        geometry: {
          type: "Polygon",
          coordinates: v
        }
      };
      geojson.data.features.push(f);
    });

    map.addSource(name, geojson);

    const layer = {
      id: name + '-fill',
      type: 'fill',
      source: name,
      layout: {},
      paint: {}
    };

    layer.paint["fill-opacity"] = 0.3;
    layer.paint["fill-color"] = '#ff0000';

    map.addLayer(layer);

    return () => {
      map.removeSource(name);
      map.removeLayer(name + '-fill');
    }

  }, [map, mapLoaded, polygon]);

  return (<React.Fragment/>);
}

export default PolygonLayer;
