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
import InboxIcon from '@material-ui/icons/MoveToInbox';

const NavMenu = ({ display, toggleDisplay, smallDisplay, logout }) => {
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
                {smallDisplay &&
                    <List>
                        <ListItem button
                            onClick={logout}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                }
                <Divider />
                <List>
                    {smallDisplay &&
                        <ListItem button
                            component={Link}
                            to="/"
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    }
                    <ListItem button
                        component={Link}
                        to="/new_log"
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logbook" />
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
    toggleDisplay: PropTypes.func.isRequired
}

export default NavMenu;
