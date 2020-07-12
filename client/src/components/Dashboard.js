import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import plane_logo from '../static/client/plane_logo.png';

// Redux
import { connect } from 'react-redux';
import { setCourse } from '../actions/authActions';

// Material UI
import {
    Container,
    Fab,
    Grid,
    Paper,
    Tooltip,
    Typography
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

// Components
import ProgressRing from './ProgressRing';
import CourseSelect from './CourseSelect';
import CourseStats from './CourseStats';

const useStyles = makeStyles(() => ({
    addLog: {
        position: 'sticky',
        bottom: 30,
        left: 'calc(100% - 88px)'
    },
    container: {
        minHeight: 'calc(100vh - 60px)',
        background: `url(${plane_logo}) center / 54% fixed no-repeat`,
        paddingTop: 60
    },
    centeredContent: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 24
    },
    gridMain: {
        marginBottom: 24
    },
    paperMain: {
        margin: '0 4vw',
        padding: 16,
        backgroundColor: 'transparent'
    },
    paperTop: {
        maxWidth: 300,
        margin: '0 auto 16px auto',
        padding: 16,
    }
}));

const Dashboard = ({ courses, progress, totals, userCourse, setCourse }) => {
    let reqs = null;
    if (userCourse) {
        reqs = userCourse.requirements;
    }

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Paper className={classes.paperMain} elevation={3}>

                <Grid container className={classes.gridMain}>
                    <Paper className={classes.paperTop} elevation={3}>
                        <Grid container item xs={12}>
                            <ProgressRing progress={progress} />
                            <Grid item xs={12} className={classes.centeredContent}>
                                {userCourse && (
                                    <Typography variant="h6">
                                        {userCourse.name}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={12} className={classes.centeredContent}>
                                <CourseSelect courses={courses} handleSubmit={setCourse} />
                            </Grid>
                        </Grid>
                    </Paper>

                    {reqs && totals && <CourseStats reqs={reqs} totals={totals} />}
                </Grid>
            </Paper>
            <Tooltip title="New Log" aria-label="new log">
                <Fab className={classes.addLog}
                    color="primary"
                    aria-label="add"
                    component={Link}
                    to="/new_log"
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Container>
    )
}

// PropTypes
Dashboard.propTypes = {
    courses: PropTypes.array.isRequired,
    progress: PropTypes.number,
    setCourse: PropTypes.func.isRequired,
    totals: PropTypes.object,
    userCourse: PropTypes.object
}

const mapStateToProps = state => ({
    courses: state.course.courses,
    progress: state.log.progress,
    totals: state.log.totals,
    userCourse: state.auth.user.course
});
export default connect(
    mapStateToProps,
    { setCourse }
)(Dashboard);
