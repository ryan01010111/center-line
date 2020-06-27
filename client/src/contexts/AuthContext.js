import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import actions from './AuthActions';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    token: localStorage.getItem('token'),
    user: null        
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = () => actions.loadUser(state, dispatch);

    return (
        <AuthContext.Provider
            value={{
                loadUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
