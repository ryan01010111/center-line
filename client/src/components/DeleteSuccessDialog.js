import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle
} from '@material-ui/core';

const SuccessDialog = ({ open, close }) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Log deleted successfully</DialogTitle>
            <DialogActions>
                <Button color="primary" autoFocus
                    onClick={close}
                >
                    Continue
                </Button>
            </DialogActions>
      </Dialog>
    )
}

// PropTypes
SuccessDialog.propTypes = {
    close: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default SuccessDialog;
