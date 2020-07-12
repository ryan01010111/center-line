import {
    LOGS_LOADING,
    LOGS_LOADED,
    ADD_LOG,
    UPDATE_LOG,
    DELETE_LOG,
    UPDATE_PROGRESS
} from '../actions/types';

const initialState = {
    logs: [],
    progress: null,
    totals: null,
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LOGS_LOADED:
            return {
                ...state,
                logs: action.payload.logs,
                progress: action.payload.progress,
                totals: action.payload.totals,
                isLoading: false
            };
        case ADD_LOG:
        case UPDATE_LOG:
        case DELETE_LOG:
            return {
                ...state,
                logs: action.payload.logs,
                progress: action.payload.progress,
                totals: action.payload.totals
            }
        case UPDATE_PROGRESS:
            return {
                ...state,
                progress: action.payload
            }
        default:
            return state;
    }
}
