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

export const login = ({ email, password }) => async dispatch => {
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
