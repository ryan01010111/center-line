import React from 'react';
import { Link } from 'react-router-dom';

import plane_logo from '../static/client/plane_logo.png'

import { Container, Fab, Tooltip } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    container: {
        minHeight: 'calc(90vh - 80px)',
        background: `url(${plane_logo}) center / 60% no-repeat`
    }
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Tooltip title="New Log" aria-label="new log">
                <Fab color="primary"
                    aria-label="add"
                    component={Link}
                    to="/new_log"
                    style={{ position: 'absolute', bottom: 40, right: 'calc(50% - 28px)' }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Container>
    )
}

export default Dashboard;
