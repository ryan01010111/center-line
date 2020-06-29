import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { returnErrors } from '../actions/errorActions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/">
            Center Line
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^[a-z0-9-_!@#$%&*?]+$/i;

const Register = ({ register, error, returnErrors }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [msg, setMsg] = useState(null);
    const [labelError, setLabelError] = useState(null);

    useEffect(() => {
        if (error.id === 'REGISTER_FAIL') {
            setMsg(error.msg);
        } else {
            setMsg(null);
        }
    }, [error, msg]);

    const handleSubmit = e => {
        e.preventDefault();
        
        let newLabelError = null;
        if (!firstName) {
            returnErrors('Please enter your first name', null, 'REGISTER_FAIL');
            newLabelError = 'firstName';
        } else if (!lastName) {
            returnErrors('Please enter your last name', null, 'REGISTER_FAIL');
            newLabelError = 'lastName';
        } else if (!email || !emailRegex.test(email)) {
            returnErrors('Please enter a valid email address', null, 'REGISTER_FAIL');
            newLabelError = 'email';
        } else if (!password || password.length < 6 || !passwordRegex.test(password)) {
            returnErrors(
                'Your password should be at least 6 characters long, and contain only letters, numbers, and/or the following: _!@#$%&*',
                null,
                'REGISTER_FAIL'
            );
            newLabelError = 'password';
        } else if (!agreedToTerms) {
            returnErrors('You must agree to the terms of service', null, 'REGISTER_FAIL');
        } else {
            register({
                firstName,
                lastName,
                email,
                password,
            });
        }
        setLabelError(newLabelError);
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} noValidate
                onSubmit={handleSubmit}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            id="firstName"
                            autoComplete="fname"
                            name="firstName"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                            fullWidth
                            label="First Name"
                            autoFocus
                            error={labelError === 'firstName'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            id="lastName"
                            required
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            autoComplete="lname"
                            error={labelError === 'lastName'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            id="email"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            error={labelError === 'email'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            id="password"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            error={labelError === 'password'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox color="primary"
                                    checked={agreedToTerms}
                                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                                />
                            }
                            label="I agree to Center Line's terms of service."
                        />
                    </Grid>
                </Grid>
                {msg &&
                    <Typography variant="body1"
                        color="error"
                        align="center"
                    >
                        {msg}
                    </Typography>
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="center">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
        </Container>
    );
}

//PropTypes
Register.propTypes = {
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    error: state.error
});
export default connect(
    mapStateToProps,
    { register, returnErrors }
)(Register);
