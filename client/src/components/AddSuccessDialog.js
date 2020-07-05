import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle
} from '@material-ui/core';

const AddSuccessDialog = ({ title, open }) => {
    const history = useHistory();
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogActions>
                <Button color="primary" autoFocus
                    onClick={() => history.push('/dashboard')}
                >
                    Dashboard
                </Button>
            </DialogActions>
      </Dialog>
    )
}

// PropTypes
AddSuccessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
}

export default AddSuccessDialog;
