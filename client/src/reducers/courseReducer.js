import { COURSES_LOADING, COURSES_LOADED } from '../actions/types';

const initialState = {
    courses: [],
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case COURSES_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case COURSES_LOADED:
            return {
                ...state,
                isLoading: false,
                courses: action.payload
            }
        default:
            return state;
    }
}
