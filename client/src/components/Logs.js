import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
    Grid,
    List,
    ListItem,
    Paper
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { makeStyles } from '@material-ui/styles';

// Components
import LogbookYear from './LogbookYear';

const useStyles = makeStyles(() => ({
    list: {
        marginTop: 16
    },
    noLogs: {
        textAlign: 'center',
        padding: '10vh 0 15vh 0',
        marginTop: '10vh',
        fontSize: '1.4em'
    }
}));

const Logs = ({ logs, handleClick }) => {

    const genLogs = () => {
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
                    onClick={() => handleClick(log)}
                >
                    <Grid container justify="space-around">
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            {date.toLocaleDateString()}
                        </Grid>
                        <Grid item xs={4}>
                            {log.type === 'checkridePrep' ? 'checkride prep' : log.type}
                        </Grid>
                        <Grid item xs={3}>
                            <div style={{ display: 'flex' }}>
                                <TimerIcon fontSize="small" style={{ marginRight: 4 }}/>
                                <span>{log.duration || '-'}</span>
                            </div>
                        </Grid>
                    </Grid>
                </ListItem>
            );
        });

        return (
            <>
                {Object.keys(years).map(year => {
                    return (
                        <LogbookYear  key={`year-${year}`}
                            year={year}
                            months={years[year]}
                        />
                    );
                }).reverse()}
            </>
        )
    }

    const classes = useStyles();
    
    return logs.length > 0
        ? (
            <List subheader={<li />} className={classes.list}>
                {genLogs()}
            </List>
        ) : (
            <Paper className={classes.noLogs}
                variant="outlined"
            >
                No logs yet!
            </Paper>
        )
}

// PropTypes
Logs.propTypes = {
    handleClick: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired
}

export default Logs;
