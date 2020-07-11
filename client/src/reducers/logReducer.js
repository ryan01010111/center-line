import {
    LOGS_LOADING,
    LOGS_LOADED,
    ADD_LOG,
    UPDATE_LOG,
    DELETE_LOG
} from '../actions/types';

const initialState = {
    logs: [],
    progress: 0,
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
                isLoading: false
            };
        case ADD_LOG:
        case UPDATE_LOG:
        case DELETE_LOG:
            return {
                ...state,
                logs: action.payload.logs,
                progress: action.payload.progress
            }
        default:
            return state;
    }
}
