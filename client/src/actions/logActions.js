import {
    LOGS_LOADING,
    LOGS_LOADED,
    ADD_LOG,
    UPDATE_LOG,
    DELETE_LOG,
    ADD_LOG_FAIL,
    UPDATE_LOG_FAIL,
    DELETE_LOG_FAIL,
    UPDATE_PROGRESS
} from './types';
import { returnErrors, clearErrors } from './errorActions';
import { tokenConfig } from './authActions';

function calcProgress(totals, getState) {
    const course = getState().auth.user.course;
    if (!course) {
        return null;
    }
    if (!totals) {
        return 0;
    }
    const reqs = course.requirements;
    let numOfReqs = Object.keys(reqs).length;
    let avg = 0;
    for (let [key, value] of Object.entries(reqs)) {
        if (!totals[key]) {
            avg += 0;
        } else if (totals[key] >= value) {
            avg += 1;
        } else {
            avg += (totals[key] / value) 
        }
    }
    return Math.round((avg / numOfReqs) * 100);
}

export const getLogs = () => async (dispatch, getState) => {
    dispatch({ type: LOGS_LOADING });

    const res = await fetch('/api/logs/data', tokenConfig('GET', getState));
    const data = await res.json();

    if (res.status === 200) {
        if (!data.logs) {
            data.logs = [];
        }
        data.progress = calcProgress(data.totals, getState);
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
        data.progress = calcProgress(data.totals, getState);
        dispatch({
            type: ADD_LOG,
            payload: data
        });
        dispatch(clearErrors());
        return true;
    } else {
        dispatch(returnErrors(data.error, res.status, ADD_LOG_FAIL));
        return false;
    }
}

export const updateLog = (fields, id) => async (dispatch, getState) => {
    const config = tokenConfig('PUT', getState);
    config.body = JSON.stringify({ fields });
    const res = await fetch(`/api/logs/${id}`, config);
    const data = await res.json();

    if (res.status === 200) {
        data.progress = calcProgress(data.totals, getState);
        dispatch({
            type: UPDATE_LOG,
            payload: data
        });
        dispatch(clearErrors());
        return true;
    } else {
        dispatch(returnErrors(data.error, res.status, UPDATE_LOG_FAIL));
        return false;
    }
}

export const deleteLog = id => async (dispatch, getState) => {
    const res = await fetch(`/api/logs/${id}`, tokenConfig('DELETE', getState));
    const data = await res.json();

    if (res.status === 200) {
        if (!data.logs) {
            data.logs = [];
        }
        data.progress = calcProgress(data.totals, getState);
        dispatch({
            type: DELETE_LOG,
            payload: data
        });
        dispatch(clearErrors());
        return true;
    } else {
        dispatch(returnErrors(data.error, res.status, DELETE_LOG_FAIL));
        return false;
    }
}

export const updateProgress = () => (dispatch, getState) => {
    const totals = getState().log.totals;
    const progress = calcProgress(totals, getState);

    dispatch({
        type: UPDATE_PROGRESS,
        payload: progress
    });
}
