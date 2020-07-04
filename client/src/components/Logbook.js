import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getLogs } from '../actions/logActions';

import {
    Button,
    CircularProgress,
    Collapse,
    Container,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FlightLogSummary from './FlightLogSummary';

const useStyles = makeStyles(theme => ({
    month: {
        top: 60,
        zIndex: 2,
        justifyContent: 'left',
        borderBottom: '1px solid #777',
        borderRadius: 0,
        color: `${theme.palette.primary.light}`,
    },
    progress: {
      position: 'absolute',
      top: '40%',
      left: 'calc(50% - 20px)'
    },
    root: {
        marginTop: 40,
        '& ul': {
            padding: 0
        },
        '& .MuiListSubheader-root': {
            width: '100%',
            backgroundColor: `${theme.palette.background.default}`,
            '&:hover': {
                backgroundColor: '#555'
            }
        }
    },
    year: {
        marginTop: 4,
        zIndex: 3,
        border: `2px solid ${theme.palette.secondary.main}`
    }
}));

const monthNames = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
const today = new Date();

const Logbook = ({ getLogs, logs }) => {
    const [logsLoaded, setLogsLoaded] = useState(false);
    const [openYear, setOpenYear] = useState(`year-${today.getFullYear()}`);
    const [openMonth, setOpenMonth] = useState(`month-${today.getMonth()}`);
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(() => {
        if (!logsLoaded) {
            getLogs()
                .then(() => setLogsLoaded(true));
        }
    }, [getLogs, logsLoaded]);

    const renderLogs = () => {
        const years = {};

        logs.forEach(log => {
            const date = new Date(log.date);
            const year = date.getFullYear();
            const month = date.getMonth();
        
            if (!years[year]) {
                years[year] = [...Array(12)].map(y => []);
            }
        
            years[year][month].push(
                <ListItem button key={log._id}
                    onClick={() => setSelectedLog(log)}
                >
                    <ListItemText primary={date.toLocaleDateString()} />
                </ListItem>
            );
        });
        
        return Object.keys(years).map(year => {
            return (
                <li key={`year-${year}`}>
                    <List>
                        <ListSubheader component={Button}

                            className={classes.year}
                            onClick={() => setOpenYear(openYear !== `year-${year}` ? `year-${year}` : '')}
                        >
                            {year}
                        </ListSubheader>
                        <Collapse in={openYear === `year-${year}`}>
                            {years[year].map((month, index) => {
                                return (
                                    <li key={`month-${monthNames[index]}`}>
                                        <ul>
                                            <ListSubheader component={Button}
                                                className={classes.month}
                                                onClick={() => setOpenMonth(openMonth !== `month-${index}` ? `month-${index}` : '')}
                                            >
                                                {monthNames[index]}
                                            </ListSubheader>
                                            <Collapse key={`month-${index}`} in={openMonth === `month-${index}`}>
                                                {month}
                                            </Collapse>
                                        </ul>
                                    </li>
                                );
                            })}
                        </Collapse>
                    </List>
                </li>
            );
        });
    }
    
    const classes = useStyles();

    return !logsLoaded
        ? (
            <CircularProgress className={classes.progress}
              color="secondary"
            />
        ) : !selectedLog
            ? (
                <Container className={classes.root}>
                    <Typography variant="h4" align="center">Logbook</Typography>
                    <List subheader={<li />} style={{ marginTop: 16 }}>
                        {renderLogs()}
                    </List>
                </Container>
            ) : (
                <Container>
                    <FlightLogSummary
                        data={selectedLog}
                        fromLogbook={true}
                        closeSummary={() => setSelectedLog('')}
                    />
                </Container>
            )
}

// PropTypes
Logbook.propTypes = {
    getLogs: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    logs: state.log.logs
});
export default connect(
    mapStateToProps,
    { getLogs }
)
(Logbook);
