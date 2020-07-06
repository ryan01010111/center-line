import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Fab, Tooltip } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

const Dashboard = () => {
    return (
        <Container>
            <img src="../../static/client/plane_logo.png" alt="plane logo"/>
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
