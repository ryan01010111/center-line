import { LOGS_LOADING, LOGS_LOADED } from './types';
import { returnErrors, clearErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getLogs = () => async (dispatch, getState) => {
    dispatch({ type: LOGS_LOADING });

    const res = await fetch('/api/logs', tokenConfig( 'GET', getState));
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
