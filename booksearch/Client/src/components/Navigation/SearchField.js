import React from "react";
import { InputBase } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { fade, makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));

const SearchField = (props) => {
    const classes = useStyles();
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit()
    }
    return (
        <form className={classes.search} onSubmit={e => handleSubmit(e)}
        >
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={props.onChange}
            />
        </form>
    )
}

SearchField.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
}

export default SearchField