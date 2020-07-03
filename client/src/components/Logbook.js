import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getLogs } from '../actions/logActions';

import {
    CircularProgress,
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
    }
  });

const months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];

const Logbook = ({ getLogs, logs }) => {
    const [logsLoaded, setLogsLoaded] = useState(false);

    useEffect(() => {
        if (!logsLoaded) {
            getLogs()
                .then(() => setLogsLoaded(true));
        }
    }, [getLogs, logsLoaded]);

    const renderLogs = () => {
        const years = {};
        let minYear = 0;
        let maxYear = 0;

        logs.forEach(log => {
            const logDate = new Date(log.date);
            const year = logDate.getFullYear();
            const month = logDate.getMonth();
            minYear = Math.min(minYear, year);
            maxYear = Math.max(maxYear, year);
            
            if (!years[year]) {
                years[year] = [];
            }

            if (!years[year][month]) {
                years[year][month] = []
            }
                
            years[year][month].push (
                <ListItem button key={log._id}>
                    <ListItemText primary={log.duration} />
                </ListItem>
            );
        });

        const genYear = (year, months, key) => (
                <li key={`year-${key}`}>
                    <ul>
                        <ListSubheader>{year}</ListSubheader>
                        {months}
                    </ul>
                </li>
        );

        const genMonth = (month, logs, key) => (
            <li key={`month-${key}`}>
                <ul>
                    <ListSubheader>{month}</ListSubheader>
                    {logs}
                </ul>
            </li>
    );

        const monthList = months.map((month, index) => genMonth(month, logList, index));

        return monthList;
    }
    
    const classes = useStyles();

    return !logsLoaded
        ? (
            <CircularProgress className={classes.progress}
              color="secondary"
            />
        ) : (
            <List>
                {renderLogs()}
            </List>
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
