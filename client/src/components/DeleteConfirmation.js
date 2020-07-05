import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

const DeleteConfirmation = ({ open, close, handleDelete }) => {

    const handleClick = () => {
        close();
        handleDelete();
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Delete Log?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this log?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    Cancel
                </Button>
                <Button autoFocus
                    onClick={handleClick}
                    style={{ color: '#f44336' }}
                >
                    Delete
                </Button>
            </DialogActions>
      </Dialog>
    )
}

// PropTypes
DeleteConfirmation.propTypes = {
    close: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
}

export default DeleteConfirmation;
