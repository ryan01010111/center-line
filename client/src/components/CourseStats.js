import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
    borderItem: {
        borderBottom: `1px solid ${theme.palette.secondary.dark}`,
        margin: '8px 0px'
    },
    statsGrid: {
        '& > .MuiGrid-item': {
            padding: 8
        },
        '& .MuiPaper-rounded': {
            backgroundColor: 'transparent'
        }
    },
    header: {
        margin: '16px 12px',
        borderBottom: `2px solid ${theme.palette.primary.main}`
    }
}));

const reqNames = {
    totalHours: 'Total Hrs',
    dual: 'Dual',
    pic: 'PIC',
    night: 'Night Hrs',
    ccDual: 'CC Dual',
    ccSolo: 'CC Solo',
    ccNight: 'CC Night',
    cc150: '150 NM',
    maneuver: 'Maneuver',
    takeoffNight: 'T/O Night',
    landNight: 'Land Night',
    takeoffTower: 'T/O Tower',
    landTower: 'Land Tower',
    exam: 'Exam',
    checkridePrep: 'CR Prep',
    checkride: 'Checkride',
}

const CourseStats = ({ reqs, totals }) => {
    const minDisplayMd = useMediaQuery('(min-width: 960px)');
    
    const classes = useStyles();

    return (
        <>
            <Grid container item xs={12} className={classes.header}>
                <Grid container item xs={12} md={6}>
                    <Grid item xs={5} />
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                        <Typography variant="body2">Req.</Typography>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                        <Typography variant="body2">Total</Typography>
                    </Grid>
                </Grid>
                {minDisplayMd && (
                    <Grid container item xs={12} md={6} style={{ paddingLeft: 20 }}>
                        <Grid item xs={5} />
                        <Grid item xs={1} />
                        <Grid item xs={2}>
                            <Typography variant="body2">Req.</Typography>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={3}>
                            <Typography variant="body2">Total</Typography>
                        </Grid>
                    </Grid>
                )}
            </Grid>

            <Grid container item xs={12} className={classes.statsGrid}>
                {Object.keys(reqs).map((req, index) => {
                    return (
                        <Grid key={index} container item xs={12} md={6}>
                            <Grid container item xs={12} component={Paper} elevation={3}>
                                <Grid item xs={1} md={2} />
                                <Grid item xs={4} md={3} className={classes.borderItem}>{reqNames[req]}</Grid>
                                <Grid item xs={1} />
                                <Grid item xs={2} className={classes.borderItem}>{reqs[req]}</Grid>
                                <Grid item xs={1} />
                                <Grid item xs={2} className={classes.borderItem}>{totals ? (+totals[req]).toFixed(1) : 0}</Grid>
                                <Grid item xs={1} />
                            </Grid>
                        </Grid> 
                    )
                })}
            </Grid>
        </>
    )
}

// PropTypes
CourseStats.propTypes = {
    reqs: PropTypes.object.isRequired,
    totals: PropTypes.object.isRequired
}

export default CourseStats;
