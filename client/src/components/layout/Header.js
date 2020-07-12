import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../static/client/centerline-logo-name.png';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

// Material UI
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
} from '@material-ui/core';

// Components
import MenuIcon from '@material-ui/icons/Menu';
import NavMenu from './NavMenu';

const useStyles = makeStyles(() => ({
    logo: {
      flexGrow: 1,
      '& img': {
          width: 120
      }
    },
    menuButton: {
        marginLeft: 32,
        padding: 8
    }
  }));

const Header = ({ isAuthenticated, logout, user }) => {
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
                {/* <Typography className={classes.logo}
                    variant="h4"
                    component={Link}
                    to="/"
                >
                    Center Line
                </Typography> */}
                <div className={classes.logo}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
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
                            user={user}
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
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});
export default connect(
    mapStateToProps,
    { logout }
)(Header);
