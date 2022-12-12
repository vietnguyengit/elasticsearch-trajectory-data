import AppConstant from '../common/Constant';
import commons from './commons';
import {coordinates} from "ol/geom/flat/reverse";

type TimeRange = {
    from: Date,
    to: Date
}

const lngLatToLatLng = (coors: Array<Array<Array<Array<Number>>>>) => {
    coors[0].forEach(value => {
        value.forEach(c => {
            // Swap here
            const l = c[0];
            c[0] = c[1];
            c[1] = l;
        })
    });
}

const translateResult = (json : any) => {
    // The expected output should be like this
    const result : any = {
        hits: []
    };

    json.hits.forEach((value : any) => {
        const s = value._source
        lngLatToLatLng(s["geoPolygon"].coordinates)

        result.hits.push({
            _source : {
                uuid: s["geonet:info"]["uuid"],
                title: s.title,
                organisations: s.organisation,
                spatial_extent: {
                    type: s["geoPolygon"].type,
                    coordinates: s["geoPolygon"].coordinates
                },
                link: s.link,
                legalConstraints: s.legalConstraints,
                imageLink: s.imageLink,
                tempExtentBegin: s.tempExtentBegin,
                abstract: s.abstract,
                credit: s.credit,
                parameter: s.parameter,
                status: s.status,
                responsibleParty: s.responsibleParty
            }
        });
    });

    console.log(result);
    return result;
}

// Make a reference to the fetch function so that later we can mock it in test if we want
const internalFectch = fetch;

// Here we accept a map of field, value pair to do the fuzzy search
const internalFuzzyQuery = (fields: Map<string, string>) => {
    // The skeleton of the request
    const body = {
        query: {
            match: new Map<string, any>()
        }
    };

    fields.forEach((value, key) => {
        body.query.match.set(key || '',
            {
                query: value,
                fuzziness: "AUTO",
                fuzzy_transpositions: true,
                operator: "or",
                minimum_should_match: 1,
                analyzer: "standard",
                zero_terms_query: "none",
                lenient: false,
                prefix_length: 0,
                max_expansions: 50,
                boost: 1
            });
    });

    // Fetch do not allow body in GET, elastic search need body to do the query, they
    // treat both GET or POST the same, although GET is more semantics correct. 
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body, commons.map_replacer)
    }

    return internalFectch(AppConstant.ELASTICSEARCH_URL + '_search', options);
}

const internalSpatialQuery = (
                minLon: number, maxLon: number, minLat: number, maxLat: number, 
                polygon: Array<Array<number>>, timeRange: TimeRange, depthRange: Array<number>) => {

    console.log(`Spatial search ${minLon} ${maxLat} ${maxLon} ${minLat}`)
    // The skeleton of the request, the envelope coor is upper-left , lower-right
    interface Body {
        from: number,
        size: number,
        query: {
            bool: {
                must: {
                    range: any
                },
                filter: Array<any>
            }
        }
    }

    const body: Body = {
        from: 0,
        size: 100,
        query: {
            bool: {
                must: {
                    range: {
                        depth : { gte: depthRange[0], lte: depthRange[1] }
                    }
                },
                filter: [
                    {
                        geo_shape: {
                            location : {
                                relation: "intersects",
                                shape: {
                                    type: "envelope",
                                    coordinates: [[minLon, maxLat], [maxLon, minLat]]
                                }
                            }
                        }
                    }
                ]
            }
        }
    };

    if(polygon !== null) {
        body.query.bool.filter[0].geo_shape.location.shape.type = 'polygon';
        body.query.bool.filter[0].geo_shape.location.shape.coordinates = polygon;
    }

    // User select a different date other than the date zero?
    if (timeRange.from !== null) {
        body.query.bool.filter.push(
            {
                range: {
                    resourceTemporalExtentDetails: {
                        start : {
                            gte: timeRange.from
                        }
                    }
                }
            });
    }

    if (timeRange.to !== null) {
        body.query.bool.filter.push(
            {
                range: {
                    resourceTemporalExtentDetails: {
                        end: {
                            lte: timeRange.to
                        }
                    }
                }
            });
    }

    // Fetch do not allow body in GET, elastic search need body to do the query, they
    // treat both GET or POST the same, although GET is more semantics correct. 
    const options = {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body, commons.map_replacer)
    }

    return internalFectch(AppConstant.OPENSEARCH_URL + '_search', options);
}

const api = {
    fuzzyQuery: internalFuzzyQuery,
    spatialQuery: internalSpatialQuery,
    fetch: internalFectch,
    transform: translateResult,
}

export default api;