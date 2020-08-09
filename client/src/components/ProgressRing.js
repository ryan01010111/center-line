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
            marginBottom={2}
        >
            <Paper className={classes.paper} elevation={3}>
                <CircularProgress variant="static"
                    color={(progress || progress === 0) ? "secondary" : "inherit"}
                    value={(progress || progress === 0) ? progress : 56}
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
                        {(progress || progress === 0) ? `${progress}%` : 'N/A'}
                    </Typography>
                </Box>
                <Typography variant="h6"></Typography>
            </Paper>
        </Box>
    )
}

// PropTypes
ProgressRing.propTypes = {
    progress: PropTypes.number
}

export default ProgressRing;
