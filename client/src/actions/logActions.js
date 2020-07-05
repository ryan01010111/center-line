import { LOGS_LOADING, LOGS_LOADED, ADD_LOG, UPDATE_LOG, DELETE_LOG } from './types';
import { returnErrors, clearErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getLogs = () => async (dispatch, getState) => {
    dispatch({ type: LOGS_LOADING });

    const res = await fetch('/api/logs', tokenConfig('GET', getState));
    const data = await res.json();

    if (res.status === 200) {
        dispatch({
            type: LOGS_LOADED,
            payload: data
        });
        dispatch(clearErrors());
    } else {
        dispatch(returnErrors(data.error, res.status));
    }
}

export const addLog = fields => async (dispatch, getState) => {
    const config = tokenConfig('POST', getState);
    config.body = JSON.stringify({ fields });
    const res = await fetch('/api/logs', config);
    const data = await res.json();

    if (res.status === 200) {
        dispatch({
            type: ADD_LOG,
            payload: data
        });
        dispatch(clearErrors());
        return true;
    } else {
        dispatch(returnErrors(data.error, res.status, 'ADD_LOG_FAIL'));
        return false;
    }
}

export const updateLog = (fields, id) => async (dispatch, getState) => {
    const config = tokenConfig('PUT', getState);
    config.body = JSON.stringify({ fields });
    const res = await fetch(`/api/logs/${id}`, config);
    const data = await res.json();

    if (res.status === 200) {
        dispatch({
            type: UPDATE_LOG,
            payload: data
        });
        dispatch(clearErrors());
        return true;
    } else {
        dispatch(returnErrors(data.error, res.status, 'UPDATE_LOG_FAIL'));
        return false;
    }
}

export const deleteLog = id => async (dispatch, getState) => {
    const res = await fetch(`/api/logs/${id}`, tokenConfig('DELETE', getState));
    const data = await res.json();

    if (res.status === 200) {
        dispatch({
            type: DELETE_LOG,
            payload: data._id
        });
        dispatch(clearErrors());
        return true;
    } else {
        dispatch(returnErrors(data.error, res.status, 'DELETE_LOG_FAIL'));
        return false;
    }
}
