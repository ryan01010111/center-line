import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    container: {
        margin: '40px 0'
    },
    buttons: {
        width: '100%'
    }
}));

const FormStepButtons = ({ step, nextStep, prevStep, validated, submitLog }) => {
    const classes = useStyles();
    return (
        <Grid container
            className={classes.container}
        >
            <Grid item xs={2} md={4} />
            <Grid item xs={3} md={1}>
                <Button color="primary"
                    className={classes.buttons}
                    variant="contained"
                    disabled={step < 2}
                    onClick={prevStep}
                >
                    Prev
                </Button>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={3} md={1}>
                <Button color="primary"
                    className={classes.buttons}
                    variant="contained"
                    disabled={step === 3 && !validated}
                    onClick={step < 4 ? nextStep : submitLog}
                >
                    {step === 3
                        ? 'Review' : step === 4
                            ? 'Submit' : 'Next'
                    }
                </Button>
            </Grid>
            <Grid item xs={2} md={4} />
        </Grid>
    )
}

// PropTypes
FormStepButtons.propTypes = {
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    submitLog: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired
}

export default FormStepButtons;
