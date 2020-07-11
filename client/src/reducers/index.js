import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import logReducer from './logReducer';
import courseReducer from './courseReducer';

export default combineReducers({
    auth: authReducer,
    course: courseReducer,
    error: errorReducer,
    log: logReducer
});
