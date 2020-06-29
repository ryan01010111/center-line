import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { returnErrors } from '../actions/errorActions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlined from '@material-ui/icons/LockOutlined';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({ login, error, returnErrors }) => {
    const storedUser = localStorage.getItem('rememberUser');
    const [email, setEmail] = useState(storedUser || '');
    const [password, setPassword] = useState('');
    const [rememberUser, setRememberUser] = useState(storedUser ? true : false);
    const [msg, setMsg] = useState(null);
    const [labelError, setLabelError] = useState(null);

    useEffect(() => {
        if (error.id === 'LOGIN_FAIL') {
            setMsg(error.msg);
        } else {
            setMsg(null);
        }
    }, [error, msg]);

    const handleSubmit = e => {
        e.preventDefault();

        let newLabelError = null;
        if (!email) {
            returnErrors('Please enter your email address', null, 'LOGIN_FAIL');
            newLabelError = 'email';
        } else if (!password) {
            returnErrors('Please enter your password', null, 'LOGIN_FAIL');
            newLabelError = 'password';
        } else {
            login({
                email,
                password,
                rememberUser
            });
        }
        setLabelError(newLabelError);
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate
                onSubmit={handleSubmit}
            >
            <TextField
                variant="outlined"
                id="email"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                error={labelError === 'email'}
            />
            <TextField
                variant="outlined"
                id="password"
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                error={labelError === 'password'}
            />
            <FormControlLabel
                control={
                    <Checkbox color="primary"
                        checked={rememberUser}
                        onChange={() => setRememberUser(!rememberUser)}
                    />
                }
                label="Remember me"
            />
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
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}

//PropTypes
Login.propTypes = {
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    error: state.error
});
export default connect(
    mapStateToProps,
    { login, returnErrors }
)(Login);
