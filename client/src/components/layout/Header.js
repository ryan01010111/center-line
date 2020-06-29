import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
    logo: {
      flexGrow: 1
    },
    menuButton: {
        marginLeft: 32,
        padding: 8
    }
  }));


const Header = ({ isAuthenticated, logout }) => {
    const classes = useStyles();
    
    const authLinks = (
        <>
            <Button color="inherit"
                component={Link}
                to="/new_log"
            >
                New Log
            </Button>
            <Button color="inherit"
                onClick={logout}
            >
                Logout
            </Button>
        </>
    )

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.logo}
                variant="h4"
                >
                Center Line
                </Typography>
                {isAuthenticated && authLinks}
                <IconButton className={classes.menuButton}
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon style={{ fontSize: 40 }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

// PropTypes
Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(
    mapStateToProps,
    { logout }
)(Header);
