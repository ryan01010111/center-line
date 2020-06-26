import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const initialState = {
    error: {
        id: null,
        msg: {},
        status: null
    },
    user: {
        isAuthenticated: false,
        isLoading: false,
        token: localStorage.getItem('token'),
        user: null        
    }
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider
            value={state}
        >
            {children}
        </AuthContext.Provider>
    )
}
