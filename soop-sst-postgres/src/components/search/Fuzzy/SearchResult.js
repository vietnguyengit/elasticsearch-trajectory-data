import React from "react";
import Grid from "@material-ui/core/Grid";
import SearchResultLeft from "./SearchResultLeft";
import SearchResultRight from "./SearchResultRight";

const SearchResult = (props) => {

    return (
        <React.Fragment>
            <Grid container spacing={1} rowspacing={1} margin={2}>
                <Grid item xs={3}><SearchResultLeft data={props.data.leftPanelData}/></Grid>
                <Grid item xs={9}><SearchResultRight data={props.data.rightPanelData}/></Grid>
            </Grid>
        </React.Fragment>
    )

}

export default SearchResult;