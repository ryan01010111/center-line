import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addLog } from '../actions/logActions';
import { updateLog } from '../actions/logActions';
import { clearErrors } from '../actions/errorActions';

import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FlightLogForm1 from './FlightLogForm1'
import FlightLogForm2 from './FlightLogForm2'
import FlightLogForm3 from './FlightLogForm3'
import FormStepButtons from './FormStepButtons';
import FlightLogSummary from './FlightLogSummary'
import AddErrorDialog from './AddErrorDialog';
import AddSuccessDialog from './AddSuccessDialog';

const useStyles = makeStyles(() => ({
    container: {
      marginTop: 24
    },
}));

const FlightLog = ({ addLog, error, clearErrors, log, updateLog }) => {
    let fields = null;
    if (log) {
        const {
            type, route, aircraftModel, aircraftIdent,
            aircraftClass, duration, nightTime, dual, pic, takeoffDay,
            landDay, takeoffNight, landNight, takeoffTower, landTower,
            maneuver, ccDual, ccSolo, ccAdditional, instrumentActual,
            instrumentSim, instrumentApproach
        } = log;
        const date = (new Date(log.date)).toISOString().split('T')[0];
        fields = {
            date, type, route, aircraftModel, aircraftIdent,
            aircraftClass, duration, nightTime, dual, pic, takeoffDay,
            landDay, takeoffNight, landNight, takeoffTower, landTower,
            maneuver, ccDual, ccSolo, ccAdditional, instrumentActual,
            instrumentSim, instrumentApproach
        }
    }
    
    const [data, setData] = useState(
        fields || {
            date: '',
            type: 'standard',
            route: '',
            aircraftModel: '',
            aircraftIdent: '',
            aircraftClass: [],
            duration: '',
            nightTime: '',
            dual: '',
            pic: '',
            takeoffDay: '',
            landDay: '',
            takeoffNight: '',
            landNight: '',
            takeoffTower: '',
            landTower: '',
            maneuver: '',
            ccDual: '',
            ccSolo: '',
            ccAdditional: [],
            instrumentActual: '',
            instrumentSim: '',
            instrumentApproach: ''
        }
    );

    const [validated, setValidated] = useState(true);
    const [step, setStep] = useState(1);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const nextStep = () => {
        const valid = data.date && data.type ? true : false;
        setValidated(valid);
        valid && setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    const renderStep = step => {
        switch (step) {
            case 1:
                return (
                    <FlightLogForm1
                        data={data}
                        validated={validated}
                        onChange={handleChange}
                    />
                )
            case 2:
                return (
                    <FlightLogForm2
                        data={data}
                        onChange={handleChange}
                    />
                )
            case 3:
                return (
                    <FlightLogForm3
                        data={data}
                        onChange={handleChange}
                    />
                )
            case 4:
                return (
                    <FlightLogSummary
                        data={data}
                    />
                )
            default:
                setStep(1);
        }
    }

    const handleChange = e => {
        let { name, value } = e.target;
        setData(prevData => {
            if (name === 'aircraftClass') {
                let specs = prevData.aircraftClass;
                const valToRemove = value === 'sel'
                    ? 'mel'
                    : 'sel'
                const index = specs.indexOf(valToRemove);
                specs.splice(index, 1, value);
                return {
                    ...prevData,
                    aircraftClass: specs
                }
            }
            if (['tailwheel', 'highPerformance'].includes(name)) {
                value = prevData.aircraftClass;
                if (!value.includes(name)) {
                    value.push(name);
                } else {
                    value = value.filter(item => item !== name);
                }
                return {
                    ...prevData,
                    aircraftClass: value
                }
            }
            if (['night', '150nm'].includes(name)) {
                value = prevData.ccAdditional;
                if (!value.includes(name)) {
                    value.push(name);
                } else {
                    value = value.filter(item => item !== name);
                }
                return {
                    ...prevData,
                    ccAdditional: value
                }
            }
            return {
                ...prevData,
                [name]: value
            }
        });
        ['date', 'type'].includes(name) && setValidated(data.date && data.type ? true : false);
    };
    
    const submitLog = async () => {
        if (!log) {
            addLog(data)
                .then(success => success && setSubmitSuccess(true));
        } else {
            updateLog(data, log._id)
                .then(success => success && setSubmitSuccess(true));
        }
    }

    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Typography variant="h4"
                align="center"
            >
                {log ? 'Edit Log' : 'New Log'}
            </Typography>
            {renderStep(step)}
            <FormStepButtons
                step={step}
                nextStep={nextStep}
                prevStep={prevStep}
                validated={validated}
                submitLog={submitLog}
            />
            <AddErrorDialog
                open={error.id === 'ADD_LOG_FAIL' || error.id === 'UPDATE_LOG_FAIL'}
                title={'Oops...'}
                msg={`There was a problem submitting your log. Please try again.`}
                close={clearErrors}
                resubmit={submitLog}
            />
            <AddSuccessDialog
                open={submitSuccess}
                title={'Log entry successful'}
            />
        </Container>
    )
}

// PropTypes
FlightLog.propTypes = {
    addLog: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    log: PropTypes.object,
    updateLog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    error: state.error
});
export default connect(
    mapStateToProps,
    { addLog, updateLog, clearErrors }
)(FlightLog);
