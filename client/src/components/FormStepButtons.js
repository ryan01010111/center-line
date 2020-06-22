import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        bottom: 50,
        left: 0
    },
    buttons: {
        width: '100%'
    }
}));

const FormStepButtons = ({ step, nextStep, prevStep }) => {
    const classes = useStyles();
    return (
        <Grid container
            className={classes.container}
        >
            <Grid item xs={4} />
            <Grid item xs={1}>
                <Button
                    className={classes.buttons}
                    variant="contained"
                    disabled={step < 2}
                    onClick={prevStep}
                >
                    Prev
                </Button>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={1}>
                <Button
                    className={classes.buttons}
                    variant="contained"
                    disabled={step > 2}
                    onClick={nextStep}
                >
                    Next
                </Button>
            </Grid>
            <Grid item xs={4} />
        </Grid>
    )
}

// PropTypes
FormStepButtons.propTypes = {
    step: PropTypes.number.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
}

export default FormStepButtons;
