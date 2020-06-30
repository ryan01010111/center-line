import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NavMenu from './NavMenu';

const useStyles = makeStyles(theme => ({
    logo: {
      flexGrow: 1,
      color: theme.palette.primary.contrastText,
      textDecoration: 'none'
    },
    menuButton: {
        marginLeft: 32,
        padding: 8
    }
  }));

const Header = ({ isAuthenticated, logout }) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const path = useLocation().pathname;
    const smallDisplay = useMediaQuery('(max-width: 600px)');
    
    const authLinks = (
        <>
            <Button color="inherit"
                component={Link}
                to="/"
                style={{ marginLeft: 16 }}
            >
                Dashboard
            </Button>
            <Button color="inherit"
                onClick={logout}
                style={{ marginLeft: 16 }}
            >
                Logout
            </Button>
        </>
    )

    const unauthLinks = (
        <>
            <Button color="inherit"
                component={Link}
                to={path !== "/login" ? "/login" : "/register"}
            >
                {path !== "/login" ? "Login" : "Register"}
            </Button>
        </>
    )

    const toggleDisplay = () => setDisplayMenu(false);

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.logo}
                    variant="h4"
                    component={Link}
                    to="/"
                >
                    Center Line
                </Typography>
                {isAuthenticated ? (!smallDisplay && authLinks) : unauthLinks}
                {isAuthenticated && (
                    <>
                        <IconButton className={classes.menuButton}
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setDisplayMenu(true)}
                        >
                            <MenuIcon style={{ fontSize: 40 }} />
                        </IconButton>
                        <NavMenu
                            display={displayMenu}
                            toggleDisplay={toggleDisplay}
                            smallDisplay={smallDisplay}
                            logout={logout}
                        />
                    </>
                )}
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
