import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard'
import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logbook from './components/Logbook';
import FlightLog from './components/FlightLog';

const useStyles = makeStyles({
  progress: {
    position: 'absolute',
    top: '40%',
    left: 'calc(50% - 20px)'
  }
});

function App() {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    if (!authLoaded) {
      store.dispatch(loadUser())
        .then(() => setAuthLoaded(true));
    }
  }, [authLoaded]);

  const classes = useStyles();
  
  return (
    <Router>
      <Provider store={store}>
        <Header />
        {!authLoaded
          ? (
            <CircularProgress className={classes.progress}
              color="secondary"
            />
          ) : (
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <ProtectedRoute path="/logbook"
                component={Logbook}
              />
              <ProtectedRoute path="/new_log"
                component={FlightLog}
              />
              <ProtectedRoute path="/"
                component={Dashboard}
              />
            </Switch>
          )
        }
      </Provider>
    </Router>
  )
}

export default App;
