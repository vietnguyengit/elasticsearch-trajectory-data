

const AppConstant = {
    APPLICATION_NAME: "Open Access to Ocean Data",
    AODN_LONG_NAME: "Australia Occean Data Network",
    IMOS_LONG_NAME: "Integrated Marine Observing System",
    DATE_FORMAT: "MM/dd/yyyy",
    
    SEARCH_FUZZY: "Fuzzy Search",
    SEARCH_FUZZY_PLACEHOLDER: "Input seach criteria",
    SEARCH_TEMPORAL_SPATIAL: "Spatial & Temporal Search",

    // The real host is set package.json proxy attribute this can avoid CORS error
    OPENSEARCH_URL: '',
    GEONETWORK_SEARCH_URL: '/gn-records/',
    ELASTICSEARCH_URL: 'search-soop-trajectory-data/',

    MAP : {
        DEFAULT_DEPTH: [300, 1000],
        MULTI_POLYGON: 'MultiPolygon',
        POINT: 'Point',
        PROJECTION: 'EPSG:4326',
        DEFAULT_LOCATION: { lat: -33.558358040024906, lng: 151.27883151168 },
        DEFAULT_ZOOM: 2.5,
        SEARCH_AREA_SIZE: 1.5,
        SEARCH_BOX_ZINDEX: 2,
        POLYGON_AREA_ZINDEX: 3.
    }
}

export default AppConstant;