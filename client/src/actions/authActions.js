import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from './types';
import { returnErrors, clearErrors } from './errorActions';

// request config with token
export const tokenConfig = (method, getState) => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const token = getState().auth.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const res = await fetch('/api/auth/user', tokenConfig('GET', getState));
    const data = await res.json();
    
    if (res.status === 200) {
        dispatch({
            type: USER_LOADED,
            payload: data
        });
    } else {
        localStorage.removeItem('token');
        dispatch(returnErrors(data.error, res.status));
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const login = ({ email, password, rememberUser }) => async dispatch => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    config.body = JSON.stringify({ email, password });

    const res = await fetch('/api/auth/login', config);
    const data = await res.json();
    
    if (res.status === 200) {
        localStorage.setItem('token', data.token);
        if (rememberUser) {
            localStorage.setItem('rememberUser', email)
        } else {
            localStorage.removeItem('rememberUser')
        }
        dispatch(clearErrors());
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
    } else {
        dispatch(returnErrors(data.error, res.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_SUCCESS
    };
}

export const register = userData => async dispatch => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    config.body = JSON.stringify(userData);

    const res = await fetch('/api/auth/register', config);
    const data = await res.json();
    
    if (res.status === 200) {
        localStorage.setItem('token', data.token);
        dispatch(clearErrors());
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch(returnErrors(data.error, res.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        });
    }
}
