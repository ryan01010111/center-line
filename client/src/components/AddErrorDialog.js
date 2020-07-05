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

const AddErrorDialog = ({ title, msg, open, close, resubmit }) => {

    const handleResubmit = () => {
        close();
        setTimeout(() => resubmit(), 1000);
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleResubmit} color="primary" autoFocus>
                    Try again
                </Button>
            </DialogActions>
      </Dialog>
    )
}

// PropTypes
AddErrorDialog.propTypes = {
    close: PropTypes.func.isRequired,
    msg: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    resubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default AddErrorDialog;
