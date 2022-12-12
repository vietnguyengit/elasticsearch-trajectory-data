import React from "react";
import { Box, Tabs, Tab } from '@material-ui/core';
import AppConstant from '../../common/Constant';
import FunctionsIcon from '@material-ui/icons/Functions';
import PlaceIcon from '@material-ui/icons/Place';
import { default as FuzzySearchPanel } from './Fuzzy/TabPanel';
import { default as SpatialSearchPanel } from './Spatial/TabPanel';
import headerStyle from '../header/Header.module.css';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// We define the height here for the tab button
const buttonHeight = '100px';

// The content is calculated from 99% view height minus the height of header and the button
const contentHeight = `calc(99vh - ${headerStyle.headerGridHeight} - ${buttonHeight})`;

const SearchContainer = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Box sx={{ height: buttonHeight, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab icon={<FunctionsIcon />} label={AppConstant.SEARCH_FUZZY} {...a11yProps(0)} />
                    <Tab icon={<PlaceIcon />} label={AppConstant.SEARCH_TEMPORAL_SPATIAL} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <Box style={{height: contentHeight}} sx={{ marginTop: 2, display: "block", flexDirection: "column"}}>
                <FuzzySearchPanel value={value} contentHeight={contentHeight} index={0} />
                <SpatialSearchPanel value={value} contentHeight={contentHeight} index={1} />
            </Box>
        </React.Fragment>

    );
}

export default SearchContainer;