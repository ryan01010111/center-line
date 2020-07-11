import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deleteLog } from '../actions/logActions';
import { clearErrors } from '../actions/errorActions';

// Material UI
import {
    Container,
    Fab,
    Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

// Components
import Logs from './Logs';
import FlightLogSummary from './FlightLogSummary';
import FlightLog from './FlightLog';
import DeleteConfirmation from './DeleteConfirmation';
import DeleteErrorDialog from './DeleteErrorDialog';
import DeleteSuccessDialog from './DeleteSuccessDialog';

const useStyles = makeStyles(theme => ({
    actionBtns: {
        position: 'sticky',
        bottom: 40,
        right: 40,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        
        '& button': {
            marginLeft: 12
        }
    },
    cancelEditBtn: {
        position: 'sticky',
        bottom: 12,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    progress: {
      position: 'absolute',
      top: '40%',
      left: 'calc(50% - 20px)'
    },
    root: {
        marginTop: 40,
        marginBottom: 40,
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
    }
}));

const Logbook = ({ logs, deleteLog, error, clearErrors }) => {
    const [selectedLog, setSelectedLog] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showDelConf, setShowDelConf] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const viewLog = log => {
        setSelectedLog(log);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const handleDelete = () => {
        if (selectedLog) {
            deleteLog(selectedLog._id)
                .then(success => success && setDeleteSuccess(true));
        }
        setSelectedLog(false);
    }
    
    const classes = useStyles();

    return !selectedLog
        ? (
            <Container className={classes.root}>
                <Typography variant="h4" align="center">Logbook</Typography>
                <Logs logs={logs} handleClick={viewLog} />
                <DeleteErrorDialog
                    open={error.id === 'DELETE_LOG_FAIL'}
                    close={clearErrors}
                />
                <DeleteSuccessDialog
                    open={deleteSuccess}
                    close={() => setDeleteSuccess(false)}
                />
            </Container>
        ) : !editMode
            ? (
                <Container>
                    <FlightLogSummary
                        data={selectedLog}
                        fromLogbook={true}
                        closeSummary={() => setSelectedLog(null)}
                    />
                    <div className={classes.actionBtns}>
                        <Fab color="secondary" aria-label="edit"
                            onClick={() => setEditMode(true)}
                        >
                            <EditIcon />
                        </Fab>
                        <Fab color="default" aria-label="delete"
                            onClick={() => setShowDelConf(true)}
                        >
                            <DeleteIcon />
                        </Fab>
                        <DeleteConfirmation
                            open={showDelConf}
                            close={() => setShowDelConf(false)}
                            handleDelete={() => handleDelete()}
                        />
                    </div>
                </Container>
            ) : (
                <Container>
                    <FlightLog log={selectedLog} />
                    <div className={classes.cancelEditBtn}>
                        <Fab size="small" color="default"
                            aria-label="cancel"
                            onClick={() => setEditMode(false)}
                        >
                            <CloseIcon />
                        </Fab>
                    </div>
                </Container>
            )
}

// PropTypes
Logbook.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    deleteLog: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    logs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    error: state.error,
    logs: state.log.logs
});
export default connect(
    mapStateToProps,
    { deleteLog, clearErrors }
)(Logbook);
