import React from "react";
import { Typography, Card, Divider, Box, CardContent } from "@material-ui/core";
import {NavLink} from "react-router-dom";

// Show a list of Card to display the search result
const SearchResultRight = (props) => {

    const createCards = (obj) => {
        if (obj !== undefined && obj !== null) {
            return obj.hits.map((value, index) => (
                <Box sx={{ margin: 2}}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {value._source.title}
                            </Typography>
                            <Divider />
                            <Typography>
                                Organizations:
                                <ul>
                                    {value._source.organisations.map(i => <li key={value._source.uuid + 1}>{i}</li>)}
                                </ul>
                            </Typography>
                            <Typography>
                                <NavLink to="/details" state={{value: value}} >Details</NavLink>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ));
        }
    }

    return (
        <React.Fragment>
            {createCards(props.data)}
        </React.Fragment>
    )
}

export default SearchResultRight;