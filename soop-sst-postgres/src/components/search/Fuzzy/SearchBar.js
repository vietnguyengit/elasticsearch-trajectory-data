import React, { useRef } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import AppConstant from "../../../common/Constant";
import SearchIcon from '@material-ui/icons/Search';
import styles from './Search.module.css'

const SearchBar = (props) => {
    const textInputRef = useRef(null);

    // We need to check for input before return
    const handleSearch = (event) => {
        if (textInputRef.current !== null) {
            const searchValue = textInputRef.current.value;
            props.handleSearchClick(searchValue);
        }
    }

    const handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            // Enter key press
            handleSearch(event);
        }
    }

    return (
        <Grid container spacing={1} rowspacing={1} className={styles.searchbar__container}>
            <Grid item xs={1}></Grid>
            <Grid item xs={9}>
                <TextField fullWidth
                    inputRef={textInputRef} 
                    onKeyDown={handleKeyDown}
                    required id="search_input"
                    label={AppConstant.SEARCH_FUZZY_PLACEHOLDER}
                    type="search" 
                    variant="filled" />
            </Grid>
            <Grid item xs={1}>
                <Button startIcon={<SearchIcon className={styles.searchbar__search_icon} />} onClick={handleSearch} ></Button>
            </Grid>
        </Grid>
    );
}

export default SearchBar;