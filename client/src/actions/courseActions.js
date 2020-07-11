import { COURSES_LOADING, COURSES_LOADED } from './types';
import { returnErrors, clearErrors } from './errorActions';

export const getCourses = () => async (dispatch, getState) => {
    dispatch({ type: COURSES_LOADING });

    const res = await fetch('/api/courses');
    const data = await res.json();

    if (res.status === 200) {
        dispatch({
            type: COURSES_LOADED,
            payload: data
        });
        dispatch(clearErrors());
    } else {
        dispatch(returnErrors(data.error, res.status));
    }
}
