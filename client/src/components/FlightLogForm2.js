import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    form: {
        marginTop: 18
    },
    root: {
        '& .MuiTextField-root': {
            width: 'calc(100% - 16px)',
            margin: 8
        }
    }
}));

const FlightLogForm2 = props => {
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
                <Grid item xs={6} md={3}>
                    <TextField id="duration"
                        name="duration"
                        label="Total Duration"
                        value={data.duration}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0.0"
                        autoComplete="off"
                        inputProps={{ step: 0.1, min: 0 }}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField id="nightTime"
                        name="nightTime"
                        label="Night"
                        value={data.nightTime}
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
                    <TextField id="dual"
                        name="dual"
                        label="Dual"
                        value={data.dual}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0.0"
                        autoComplete="off"
                        inputProps={{ step: 0.1, min: 0 }}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField id="pic"
                        name="pic"
                        label="PIC"
                        value={data.pic}
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
                <Grid item xs={4} md={2}>
                    <Typography align="center">
                        Day
                    </Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Typography align="center">
                        Night
                    </Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Typography align="center">
                        Tower
                    </Typography>
                </Grid>
                <Grid item md={3} />

                <Grid item md={3} />
                <Grid item xs={4} md={2}>
                    <TextField id="takeoffDay"
                        name="takeoffDay"
                        label="T/O"
                        value={data.takeoffDay}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0"
                        autoComplete="off"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="takeoffNight"
                        name="takeoffNight"
                        label="T/O"
                        value={data.takeoffNight}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0"
                        autoComplete="off"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="takeoffTower"
                        name="takeoffTower"
                        label="T/O"
                        value={data.takeoffTower}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0"
                        autoComplete="off"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item md={3} />

                <Grid item md={3} />
                <Grid item xs={4} md={2}>
                    <TextField id="landDay"
                        name="landDay"
                        label="Land"
                        value={data.landDay}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0"
                        autoComplete="off"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="landNight"
                        name="landNight"
                        label="Land"
                        value={data.landNight}
                        onChange={onChange.bind(this)}
                        type="number"
                        variant="filled"
                        placeholder="0"
                        autoComplete="off"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item xs={4} md={2}>
                    <TextField id="landTower"
                        name="landTower"
                        label="Land"
                        value={data.landTower}
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
FlightLogForm2.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FlightLogForm2;
