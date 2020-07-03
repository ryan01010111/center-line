import React from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    form: {
        marginTop: 18
    },
    radio: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    root: {
        '& .MuiFormControl-root': {
            width: '100%'
        },
        '& .MuiFormControlLabel-root': {
            justifyContent: 'center'
        },
        '& .MuiTextField-root': {
            width: 'calc(100% - 16px)',
            margin: 8
        },
        '& .MuiInputBase-root': {
            marginTop: 'auto'
        }
    }
}));

const FlightLogForm1 = props => {
    const { data, validated, onChange } = props;
    const classes = useStyles();
    return (
        <form noValidate
            className={classes.form}
        >
            <Grid container
                className={classes.root}
                justify="center"
            >
                <Grid item md={3} />
                <Grid item xs={6} md={3}>
                    <TextField id="date"
                        name="date"
                        label="Date"
                        value={data.date}
                        onChange={onChange.bind(this)}
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        variant="filled"
                        required
                        error={!validated && !data.date}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField id="type"
                        name="type"
                        select
                        label="Type"
                        value={data.type}
                        onChange={onChange.bind(this)}
                        SelectProps={{ native: true }}
                        variant="filled"
                        required
                        error={!validated && !data.type}
                    >
                        <option value='standard'>Standard</option>
                        <option value='checkride'>Checkride</option>
                        <option value='checkridePrep'>Checkride Prep</option>
                        <option value='exam'>Exam</option>
                    </TextField>
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} />
                <Grid item xs={6}>
                    <TextField id="route"
                        name="route"
                        label="Route"
                        onChange={onChange.bind(this)}
                        variant="filled"
                    />
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} />
                <Grid item xs={6}>
                    <TextField id="aircraftModel"
                        name="aircraftModel"
                        label="Aircraft Model"
                        onChange={onChange.bind(this)}
                        variant="filled"
                    />
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} />
                <Grid item xs={6}>
                    <TextField id="aircraftIdent"
                        name="aircraftIdent"
                        label="Aircraft Ident"
                        onChange={onChange.bind(this)}
                        variant="filled"
                    />
                </Grid>
                <Grid item md={3} />
                <Grid item md={4} />
                <Grid item xs={12} md={4}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            className={classes.radio}
                            aria-label="aircraftClass"
                            name="aircraftClass"
                            value={data.aircraftClass.includes('sel')
                                ? 'sel'
                                : data.aircraftClass.includes('mel')
                                    ? 'mel'
                                    : ''
                                }
                            onChange={onChange}
                        >
                            <FormControlLabel value="sel"
                                control={<Radio />}
                                label="SEL"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel value="mel"
                                control={<Radio />}
                                label="MEL"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item md={4} />
                <Grid item md={3} />
                <Grid item xs={6} md={3}>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={data.aircraftClass.includes('tailwheel')}
                                onChange={onChange}
                                name="tailwheel" />}
                                label="Tailwheel"
                                labelPlacement="bottom"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={data.aircraftClass.includes('highPerformance')}
                                onChange={onChange}
                                name="highPerformance" />}
                                label="High Performance"
                                labelPlacement="bottom"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item md={3} />
            </Grid>
        </form>
    )
}

// PropTypes
FlightLogForm1.propTypes = {
    data: PropTypes.object.isRequired,
    validated: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FlightLogForm1;
