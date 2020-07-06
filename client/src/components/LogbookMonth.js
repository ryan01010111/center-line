import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
    Button,
    Collapse,
    ListSubheader
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    month: {
        top: 68,
        zIndex: 2,
        justifyContent: 'space-between',
        borderBottom: '1px solid #777',
        borderRadius: 0,
        color: `${theme.palette.primary.light}`
    }
}));

const monthNames = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
const today = new Date();

const LogbookMonth = ({ year, month, index }) => {
    const [openMonth, setOpenMonth] = useState(`${today.getFullYear()}-${today.getMonth()}`);

    const classes = useStyles();

    return (
        <li>
            <ul>
                <ListSubheader component={Button}
                    className={classes.month}
                    onClick={() => setOpenMonth(openMonth !== `${year}-${index}` ? `${year}-${index}` : '')}
                >
                    {monthNames[index]}
                    {openMonth === `${year}-${index}` ? <ExpandLess /> : <ExpandMore />}
                </ListSubheader>
                <Collapse key={`month-${index}`} in={openMonth === `${year}-${index}`}>
                    {month}
                </Collapse>
            </ul>
        </li>
    )
}

// PropTypes
LogbookMonth.propTypes = {
    index: PropTypes.number.isRequired,
    month: PropTypes.array.isRequired,
    year: PropTypes.string.isRequired
}

export default LogbookMonth;
