import React, { useState } from 'react';

import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FlightLogForm1 from './FlightLogForm1'
import FlightLogForm2 from './FlightLogForm2'
import FlightLogForm3 from './FlightLogForm3'
import FormStepButtons from './FormStepButtons';
import FlightLogSummary from './FlightLogSummary'

const useStyles = makeStyles(() => ({
    container: {
      marginTop: 24
    },
}));

const FlightLog = () => {
    const [data, setData] = useState({
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
    });

    const [validated, setValidated] = useState(true);

    const [step, setStep] = useState(1);

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
        const res = await fetch('/api/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'fields': data
            })
        })
        if (res.status !== 200) {
            return false;
        }
        return true;
    }

    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Typography variant="h4"
                align="center"
            >
                New Log
            </Typography>
            {renderStep(step)}
            <FormStepButtons
                step={step}
                nextStep={nextStep}
                prevStep={prevStep}
                validated={validated}
                submitLog={submitLog}
            />
        </Container>
    )
}

export default FlightLog;
