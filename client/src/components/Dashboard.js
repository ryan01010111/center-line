import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import plane_logo from '../static/client/plane_logo.png';

// Redux
import { connect } from 'react-redux';

// Material UI
import { Container, Fab, Grid, Paper, Tooltip } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

// Components
import ProgressRing from './ProgressRing';

const useStyles = makeStyles(() => ({
    container: {
        minHeight: 'calc(100vh - 80px)',
        background: `url(${plane_logo}) center / 60% no-repeat`,
        paddingTop: 80
    },
    paper: {
        margin: '0 4vw',
        padding: 16,
        backgroundColor: 'transparent'
    }
}));

const Dashboard = ({ progress }) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper} elevation={3}>
                <ProgressRing progress={progress} />
                

                {/* <Grid container>
                    <Grid item>
                        
                    </Grid>
                </Grid> */}

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
            </Paper>
        </Container>
    )
}

// PropTypes
Dashboard.propTypes = {
    progress: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    progress: state.log.progress
});
export default connect(
    mapStateToProps
)(Dashboard);
