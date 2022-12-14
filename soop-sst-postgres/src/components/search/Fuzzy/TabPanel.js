import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
// import search from '../../../api/opensearch';
// import search from '../../../api/geonetwork-search'
import search from '../../../api/elastic-search'

const TabPanel = (props) => {

    const { value, index } = props;

    const [searchResult, setSearchResult] = useState({
        leftPanelData: null,
        rightPanelData: null
    });

    const handleSearchClick = (searchValue) => {
        const m = new Map();
        m.set("title", searchValue);

        search
            .fuzzyQuery(m)
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
                    setSearchResult(prev => ({
                        ...prev,
                        rightPanelData: search.transform(raw.hits)
                    }));
                }

                return raw;
            })
            .catch((error) => {
                // TODO: Handle error
            });
    }

    return (
        <React.Fragment>
            {value === index && <SearchBar handleSearchClick={handleSearchClick} />}
            {value === index && <SearchResult data={searchResult} />}
        </React.Fragment>
    );
}

export default TabPanel;