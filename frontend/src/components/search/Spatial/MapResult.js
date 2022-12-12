import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, Divider, Box, CardContent, CardActions, Button, List, ListItemText, Slider } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DateFnsUtils from '@date-io/date-fns';
import AppConstant from '../../../common/Constant';

const ID_FROM_DATE = "from_date";
const ID_TO_DATE = "to_date";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const MapResult = (props) => {

    const classes = useStyles();
    const [expanded, setExpanded] = useState(null);
    const [depthRange, setDepthRange] = props.depthRange;
    const [timeRange, setTimeRange] = props.timeRange;

    const [tmpDepthRange, setTmpDepthRange] = useState(depthRange);

    const handleShowPolygon = (event, spatial_extent) => {
        props.setPolygons(
            // We just need the spatial extent data to be set tto the 
            // polygons and hence trigger user state update to Map
            spatial_extent
        );
    }

    const handlePointOfTruth = (event, pot) => {

    }

    const handleExpandClick = (uuid) => {
        // If we have the same uuid, that mean it is expanded, so we 
        // set it to null to collapse it.
        setExpanded((prev) => prev === uuid ? null : uuid);
    };

    const handleDepthChange = ( evt, newValue ) => {
        setTmpDepthRange(newValue);
    }
  
    const handleDateChange = (field, date) => {
        setTimeRange(prev => ({
            from: (field === ID_FROM_DATE) ? date : prev.from,
            to: (field === ID_TO_DATE) ? date : prev.to
        }));
    }

    useEffect(() => {
        
        const t = setTimeout(() => setDepthRange(tmpDepthRange), 1000);
        return () => clearTimeout(t);

    }, [tmpDepthRange]);


    const createCards = (obj) => {
        if (obj !== undefined && obj !== null && obj.hits !== null) {
            return obj.hits.map((value, index) => (
                <Box sx={{ margin: 2 }} key={value._source.uuid}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {value._source.title}
                            </Typography>
                            <Divider />
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined"
                                onClick={(event) => {
                                    handlePointOfTruth(event, value._source.point_of_truth)
                                }}>Point of truth</Button>

                            <Button variant="outlined"
                                onClick={(event) => {
                                    handleShowPolygon(event, value._source.spatial_extent)
                                }}>Show Area</Button>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: (expanded === value._source.uuid),
                                })}
                                onClick={() => handleExpandClick(value._source.uuid)}
                                aria-expanded={expanded}
                                aria-label="show more">

                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded === value._source.uuid} timeout="auto" unmountOnExit>
                            <Typography>
                                Organizations:
                                <List>
                                    {value._source.organisations.map((i, index) => <ListItemText key={value._source.uuid + index} primary={i} />)}
                                </List>
                            </Typography>
                            <Typography>
                                Start: {value._source.temporal_extent_begin} - End {value._source.temporal_extent_end}
                            </Typography>
                        </Collapse>
                    </Card>
                </Box>
            ));
        }
    }

    return (
        <React.Fragment>
            <Box
                height={props.contentHeight}
                style={{
                    overflow: "hidden",
                    overflowY: "scroll" // added scroll
                }}>
                <CardActions>
                    <Slider 
                        getAriaLabel={() => "Depth"} 
                        value={tmpDepthRange}
                        min={300}
                        max={400}
                        onChange = { handleDepthChange }
                        valueLabelDisplay="auto"
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            variant="inline"
                            margin="normal"
                            format={AppConstant.DATE_FORMAT}
                            id={ID_FROM_DATE}
                            label="From"
                            value={timeRange.from}
                            onChange={(date) => handleDateChange(ID_FROM_DATE, date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />

                        <KeyboardDatePicker
                            variant="inline"
                            margin="normal"
                            format={AppConstant.DATE_FORMAT}
                            id={ID_TO_DATE}
                            label="To"
                            value={timeRange.to}
                            onChange={(date) => handleDateChange(ID_TO_DATE, date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </MuiPickersUtilsProvider>
                </CardActions>
                <Divider />
                {props.data !== null && props.data.length !== 0 && createCards(props.data)}
            </Box>
        </React.Fragment>
    );
}

export default MapResult;