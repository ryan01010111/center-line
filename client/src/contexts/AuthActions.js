async function loadUser(state, dispatch) {
    dispatch({
        type: 'USER_LOADING',
        payload: state
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (state.token) {
        config.headers['x-auth-token'] = state.token;
    }

    const res = await fetch('/api/auth/user', config);
    if (res.status === 200) {
        const data = await res.json();
        dispatch({
            type: 'USER_LOADED',
            payload: data
        });
    } else {
        dispatch({
            type: 'AUTH_ERROR'
        });
    }
}

const actions = {loadUser};
export default actions;
