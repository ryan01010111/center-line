import React from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography
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
        }
    }
}));

const FlightLogForm3 = props => {
    const { data, onChange } = props;
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
                <Grid item xs={4} md={2}>
                    <TextField id="maneuver"
                        name="maneuver"
                        label="Maneuver"
                        value={data.maneuver}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0.0"
                        autoComplete="off"
                        inputProps={{ step: 0.1, min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="ccDual"
                        name="ccDual"
                        label="CC Dual"
                        value={data.ccDual}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0.0"
                        autoComplete="off"
                        inputProps={{ step: 0.1, min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="ccSolo"
                        name="ccSolo"
                        label="CC Solo"
                        value={data.ccSolo}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0.0"
                        autoComplete="off"
                        inputProps={{ step: 0.1, min: 0 }}
                    />
                </Grid>
                <Grid item md={3} />

                <Grid item md={3} />
                <Grid item xs={6} md={3}>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={data.ccAdditional.includes('150nm')}
                                onChange={onChange}
                                name="150nm" />}
                                label="CC 150NM"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={data.ccAdditional.includes('night')}
                                onChange={onChange}
                                name="night" />}
                                label="CC Night"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item md={3} />

                <Grid item xs={12}>
                    <Typography align="center"
                        variant="h5"
                    >
                        Instrument
                    </Typography>
                </Grid>

                <Grid item md={3} />
                <Grid item xs={4} md={2}>
                    <TextField id="instrumentActual"
                        name="instrumentActual"
                        label="Actual"
                        value={data.instrumentActual}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0.0"
                        autoComplete="off"
                        inputProps={{ step: 0.1, min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="instrumentSim"
                        name="instrumentSim"
                        label="Simulated"
                        value={data.instrumentSim}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0.0"
                        autoComplete="off"
                        inputProps={{ step: 0.1, min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="instrumentApproach"
                        name="instrumentApproach"
                        label="Approach"
                        value={data.instrumentApproach}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0"
                        autoComplete="off"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item md={3} />
            </Grid>
        </form>
    )
}

// PropTypes
FlightLogForm3.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FlightLogForm3;
