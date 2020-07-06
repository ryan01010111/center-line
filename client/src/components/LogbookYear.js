import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
    Button,
    Collapse,
    List,
    ListSubheader
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// Components
import LogbookMonth from './LogbookMonth';

const useStyles = makeStyles(theme => ({
    year: {
        top: 8,
        marginTop: 4,
        zIndex: 3,
        border: `2px solid ${theme.palette.secondary.main}`
    }
}));

const today = new Date();

const LogbookYear = ({ year, months }) => {
    const [openYear, setOpenYear] = useState(`year-${today.getFullYear()}`);

    const classes = useStyles();

    return (
        <li>
            <List>
                <ListSubheader component={Button}
                    className={classes.year}
                    onClick={() => setOpenYear(openYear !== `year-${year}` ? `year-${year}` : '')}
                >
                    {year}
                </ListSubheader>
                <Collapse in={openYear === `year-${year}`}>
                    {months.map((month, index) => {
                        return (
                            <LogbookMonth key={`month-${index}`}
                                year={year}
                                month={month}
                                index={index}
                            />
                        );
                    })}
                </Collapse>
            </List>
        </li>
    )
}

// PropTypes
LogbookYear.propTypes = {
    months: PropTypes.array.isRequired,
    year: PropTypes.string.isRequired
}

export default LogbookYear;
