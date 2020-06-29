import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Header from './components/layout/Header';
import Login from './components/Login';
import Register from './components/Register';
import FlightLog from './components/FlightLog';

const useStyles = makeStyles(() => ({
  progress: {
    position: 'absolute',
    top: '40%',
    left: 'calc(50% - 20px)'
  }
}));

function App() {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    if (!authLoaded) {
      store.dispatch(loadUser())
        .then(setAuthLoaded(true));
    }
  }, [authLoaded]);

  const classes = useStyles();
  
  return !authLoaded
    ? <CircularProgress className={classes.progress}
      color="secondary"
    />
    : (
      <Router>
        <Provider store={store}>
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/new_log">
              <FlightLog />
            </Route>
          </Switch>
        </Provider>
      </Router>
    )
}

export default App;
