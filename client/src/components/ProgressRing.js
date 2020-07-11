import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { makeStyles } from '@material-ui/styles';
import { Box, CircularProgress, Paper, Typography } from '@material-ui/core/';

const useStyles = makeStyles({
    paper: {
        position: 'relative',
        display: 'flex',
        padding: 16,
        justifyContent: 'center'
    }
});

const ProgressRing = ({ progress }) => {
    const classes = useStyles();

    return (
        <Box
            display="inline-flex"
            width="100%"
            justifyContent="center"
        >
            <Paper className={classes.paper} elevation={3}>
                <CircularProgress variant="static"
                    color="secondary"
                    value={progress}
                    size={80}
                />
                <Box
                    top={-6}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h6" component="div" color="textSecondary">
                        {progress}%
                    </Typography>
                </Box>
                <Typography variant="h6"></Typography>
            </Paper>
        </Box>
    )
}

// PropTypes
ProgressRing.propTypes = {
    progress: PropTypes.number.isRequired
}

export default ProgressRing;
