import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    Select
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 240
    }
}));

const CourseSelect = ({ courses, handleSubmit }) => {
    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);

    const submitChange = e => {
        e.preventDefault();
        const _id = (selected === 'None') ? '' : selected;
        handleSubmit(_id);
        setOpen(false);
        setSelected('');
    }

    const classes = useStyles();

    return (
        <>
            <Button variant="outlined" color="primary"
                onClick={() => setOpen(true)}
            >
                Change Course
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Select a course</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select course">Course</InputLabel>
                            <Select
                                native
                                value={selected}
                                onChange={e => setSelected(e.target.value)}
                                input={<Input id="select course" />}
                            >
                                <option aria-label="None" value="" />
                                <option aria-label="None" value="None">None</option>
                                {courses.map(course => {
                                    return <option key={course._id} value={course._id}>{course.name}</option>
                                })}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={selected === ''} onClick={submitChange} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

// PropTypes
CourseSelect.propTypes = {
    courses: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default CourseSelect;
