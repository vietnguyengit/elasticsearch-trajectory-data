import AppConstant from '../common/Constant';
import commons from './commons';

type TimeRange = {
    from: Date,
    to: Date
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
        body.query.match.set(key,
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
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body, commons.map_replacer)
    }

    return internalFectch(AppConstant.OPENSEARCH_URL + '_search', options);
}

const internalSpatialQuery = (minLon: number, maxLon: number, minLat: number, maxLat: number, timeRange: TimeRange) => {

    // The skeleton of the request, the envelope coor is upper-left , lower-right
    interface Body {
        query: {
            bool: {
                must: {
                    match_all: any
                },
                filter: Array<any>
            }
        }
    }

    const body: Body = {
        query: {
            bool: {
                must: {
                    match_all: {}
                },
                filter: [
                    {
                        geo_shape: {
                            spatial_extent: {
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

    // User select a different date other than the date zero?
    if (timeRange.from !== null) {
        body.query.bool.filter.push(
            {
                range: {
                    temporal_extent_begin: {
                        gte: timeRange.from
                    }
                }
            });
    }

    if (timeRange.to !== null) {
        body.query.bool.filter.push(
            {
                range: {
                    temporal_extent_end: {
                        lte: timeRange.to
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
    transform: (json: object) => json,  // Do nothing in this case
}

export default api;