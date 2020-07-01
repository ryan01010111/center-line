import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core/';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ListAltIcon from '@material-ui/icons/ListAlt';
import QueueIcon from '@material-ui/icons/Queue';

const NavMenu = ({ display, toggleDisplay, smallDisplay, logout, user }) => {
    return (
        <Drawer anchor="right"
            open={display}
            onClose={toggleDisplay}
        >
            <div style={{ width: 250 }}
                role="presentation"
                onClick={toggleDisplay}
                onKeyDown={toggleDisplay}
            >
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.email} />
                    </ListItem>
                    
                    <ListItem button
                        onClick={logout}
                        style={{ paddingLeft: 40 }}
                    >
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {smallDisplay &&
                        <ListItem button
                            component={Link}
                            to="/"
                        >
                            <ListItemIcon>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    }

                    <ListItem button
                        component={Link}
                        to="/logbook"
                    >
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logbook" />
                    </ListItem>

                    <ListItem button
                        component={Link}
                        to="/new_log"
                    >
                        <ListItemIcon>
                            <QueueIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Log" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

// PropTypes
NavMenu.propTypes = {
    display: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    smallDisplay: PropTypes.bool.isRequired,
    toggleDisplay: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default NavMenu;
