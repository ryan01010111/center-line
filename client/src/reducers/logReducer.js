import { LOGS_LOADING, LOGS_LOADED, ADD_LOG, UPDATE_LOG, DELETE_LOG } from '../actions/types';

const initialState = {
    logs: [],
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
                logs: action.payload,
                isLoading: false
            };
        case ADD_LOG:
            return {
                ...state,
                logs: [...state.logs, action.payload]
            }
        case UPDATE_LOG:
            return {
                ...state,
                logs: state.logs.map(log => {
                    return log._id === action.payload._id
                        ? action.payload
                        : log
                })
            }
        case DELETE_LOG:
            return {
                ...state,
                logs: state.logs.filter(log => log._id !== action.payload)
            }
        default:
            return state;
    }
}
