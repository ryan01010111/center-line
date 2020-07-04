import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        marginTop: 18,
        marginBottom: 30,

        '& .MuiGrid-item:first-child': {
            display: 'flex',
            justifyContent: 'space-between'
        },

        '& .MuiTypography-root': {
            display: 'inline-flex'
        }
    }
});

const StyledTableContainer = withStyles((theme) => ({
    root: {
        margin: '8px 0'
      },
}))(TableContainer);

const LightTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.action.hover
      },
}))(TableRow);

const BlueTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main
      }
}))(TableRow);

const BlueGridItem = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        borderRadius: '4px 0 0 4px',
        marginBottom: 12,
        marginRight: 8
      }
}))(Grid);

const FlightLogSummary = props => {
    const classes = useStyles();

    const date = (new Date(props.data.date)).toLocaleDateString();
    const {
        type,
        route,
        aircraftModel,
        aircraftIdent,
        aircraftClass,
        duration,
        nightTime,
        dual,
        pic,
        takeoffDay,
        landDay,
        takeoffNight,
        landNight,
        takeoffTower,
        landTower,
        maneuver,
        ccDual,
        ccSolo,
        ccAdditional,
        instrumentActual,
        instrumentSim,
        instrumentApproach
    } = props.data;

    return (
        <Grid container
            className={classes.container}
            spacing={1}
        >
            <Grid item xs={12}>
                <Typography variant="h6">
                    {date} | {
                        type === 'standard'
                            ? 'Standard'
                            : type === 'checkride'
                                ? 'Checkride'
                                : type === 'checkridePrep'
                                    ? 'Checkride Prep'
                                    : 'Exam'
                    }
                </Typography>
                {props.fromLogbook && (
                    <Button variant="outlined" color="secondary"
                        onClick={props.closeSummary}
                    >
                        Back
                    </Button>
                )}
            </Grid>

            <StyledTableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <BlueTableRow>
                            <TableCell />
                            <TableCell align="left">Route</TableCell>
                            <TableCell align="left">Aircraft Model</TableCell>
                            <TableCell align="left">Aircraft Ident</TableCell>
                        </BlueTableRow>
                    </TableHead>
                    <TableBody>
                        <LightTableRow>
                            <TableCell />
                            <TableCell align="left">{route}</TableCell>
                            <TableCell align="left">{aircraftModel}</TableCell>
                            <TableCell align="left">{aircraftIdent}</TableCell>
                        </LightTableRow>
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <BlueGridItem item xs={4} md={2}>Class Details</BlueGridItem>
            <Grid item xs={7} md={9}>
                {aircraftClass.map((item, index) => {
                    let text = '';
                    switch (item) {
                        case 'sel':
                            text = 'SEL';
                            break
                        case 'mel':
                            text = 'MEL';
                            break
                        case 'tailwheel':
                            text = 'Tailwheel';
                            break
                        case 'highPerformance':
                            text = 'HP';
                            break
                        default:
                            return ''
                    }
                    return (<span key={index} style={{ margin: '0 4px' }}>{text}</span>)
                })}
            </Grid>

            <StyledTableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <BlueTableRow>
                            <TableCell />
                            <TableCell align="left">Total</TableCell>
                            <TableCell align="left">Night</TableCell>
                            <TableCell align="left">Dual</TableCell>
                            <TableCell align="left">PIC</TableCell>
                        </BlueTableRow>
                    </TableHead>
                    <TableBody>
                        <LightTableRow>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="left">{duration}</TableCell>
                            <TableCell align="left">{nightTime}</TableCell>
                            <TableCell align="left">{dual}</TableCell>
                            <TableCell align="left">{pic}</TableCell>
                        </LightTableRow>
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <StyledTableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <BlueTableRow>
                            <TableCell />
                            <TableCell align="left">Day</TableCell>
                            <TableCell align="left">Night</TableCell>
                            <TableCell align="left">Tower</TableCell>
                        </BlueTableRow>
                    </TableHead>
                    <TableBody>
                        <LightTableRow>
                            <TableCell component="th" scope="row" align="center">
                                T/O
                            </TableCell>
                            <TableCell align="left">{takeoffDay}</TableCell>
                            <TableCell align="left">{takeoffNight}</TableCell>
                            <TableCell align="left">{takeoffTower}</TableCell>
                        </LightTableRow>
                        <LightTableRow>
                            <TableCell component="th" scope="row" align="center">
                                Land
                            </TableCell>
                            <TableCell align="left">{landDay}</TableCell>
                            <TableCell align="left">{landNight}</TableCell>
                            <TableCell align="left">{landTower}</TableCell>
                        </LightTableRow>
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <StyledTableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <BlueTableRow>
                            <TableCell />
                            <TableCell align="left">Maneuver</TableCell>
                            <TableCell align="left">CC Dual</TableCell>
                            <TableCell align="left">CC Solo</TableCell>
                        </BlueTableRow>
                    </TableHead>
                    <TableBody>
                        <LightTableRow>
                            <TableCell />
                            <TableCell align="left">{maneuver}</TableCell>
                            <TableCell align="left">{ccDual}</TableCell>
                            <TableCell align="left">{ccSolo}</TableCell>
                        </LightTableRow>
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <BlueGridItem item xs={4} md={2}>CC Additional</BlueGridItem>
            <Grid item xs={7} md={9}>
                {ccAdditional.map((item, index) => {
                        let text = '';
                        switch (item) {
                            case '150nm':
                                text = '150NM';
                                break
                            case 'night':
                                text = 'Night';
                                break
                            default:
                                return ''
                        }
                        return (<span key={index} style={{ margin: '0 4px' }}>{text}</span>)
                    })}
            </Grid>

            <StyledTableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <BlueTableRow>
                            <TableCell />
                            <TableCell align="left">Actual</TableCell>
                            <TableCell align="left">Simulated</TableCell>
                            <TableCell align="left">Approach</TableCell>
                        </BlueTableRow>
                    </TableHead>
                    <TableBody>
                        <LightTableRow>
                            <TableCell component="th" scope="row" align="center">
                                Instr.
                            </TableCell>
                            <TableCell align="left">{instrumentActual}</TableCell>
                            <TableCell align="left">{instrumentSim}</TableCell>
                            <TableCell align="left">{instrumentApproach}</TableCell>
                        </LightTableRow>
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Grid>
    )
}

// PropTypes
FlightLogSummary.propTypes = {
    closeSummary: PropTypes.func,
    data: PropTypes.object.isRequired,
    fromLogbook: PropTypes.bool
}

export default FlightLogSummary;
