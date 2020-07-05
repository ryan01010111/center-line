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

const DeleteErrorDialog = ({ open, close }) => {
    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Oops...</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    There was a problem deleting your log. Please try again.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    Continue
                </Button>
            </DialogActions>
      </Dialog>
    )
}

// PropTypes
DeleteErrorDialog.propTypes = {
    close: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default DeleteErrorDialog;
