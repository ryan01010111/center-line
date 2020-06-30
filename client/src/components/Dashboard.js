import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Fab } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

const Dashboard = () => {
    return (
        <Container>
            <Fab color="primary"
                aria-label="add"
                component={Link}
                to="/new_log"
                style={{ position: 'absolute', bottom: 40, right: 'calc(50% - 28px)' }}
            >
                <AddIcon />
            </Fab>
        </Container>
    )
}

export default Dashboard;
