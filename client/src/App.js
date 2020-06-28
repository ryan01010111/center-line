import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import CircularProgress from '@material-ui/core/CircularProgress';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Login from './components/Login';
import FlightLog from './components/FlightLog';

const useStyles = makeStyles(() => ({
  appBar: {
    padding: 14
  },
  progress: {
    position: 'absolute',
    top: '40%',
    left: 'calc(50% - 20px)'
  }
}));

function App() {
  const [authLoaded, setAuthLoaded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!authLoaded) {
      store.dispatch(loadUser())
        .then(setAuthLoaded(true));
    }
  }, [authLoaded]);

  return !authLoaded
    ? <CircularProgress className={classes.progress}
      color="secondary"
    />
    : (
      <Router>
        <Provider store={store}>
          <AppBar className={classes.appBar}
            position="static"
          >
            <Typography variant="h4">
              Center Line
            </Typography>
          </AppBar>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/new_log">
            <FlightLog />
          </Route>
        </Provider>
      </Router>
    )
}

export default App;
