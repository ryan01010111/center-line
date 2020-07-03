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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    progress: {
      position: 'absolute',
      top: '40%',
      left: 'calc(50% - 20px)'
    },
    root: {
        marginTop: 40,
        '& ul': {
            padding: 0
        }
    },
    year: {
        width: '100%',
        border: '2px solid #fff000'
    }
  });

const monthNames = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
const today = new Date();

const Logbook = ({ getLogs, logs }) => {
    const [logsLoaded, setLogsLoaded] = useState(false);
    const [openYear, setOpenYear] = useState(`year-${today.getFullYear()}`);
    const [openMonth, setOpenMonth] = useState(`month-${today.getMonth()}`);

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
                <Collapse key={log._id} in={openMonth === `month-${month}`}>
                    <ListItem button>
                        <ListItemText primary={date.toLocaleDateString()} />
                    </ListItem>
                </Collapse>
            );
        });
        
        return Object.keys(years).map(year => {
            return (
                <li key={`year-${year}`}>
                    <ul>
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
                                                onClick={() => setOpenMonth(openMonth !== `month-${index}` ? `month-${index}` : '')}
                                            >
                                                {monthNames[index]}
                                                </ListSubheader>
                                            {month}
                                        </ul>
                                    </li>
                                );
                            })}
                        </Collapse>
                    </ul>
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
        ) : (
            <Container className={classes.root}>
                <List subheader={<li />}>
                    {renderLogs()}
                </List>
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
