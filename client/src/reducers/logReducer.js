import { LOGS_LOADING, LOGS_LOADED } from '../actions/types';

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
        default:
            return state;
    }
}
