import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard'
import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logbook from './components/Logbook';
import FlightLog from './components/FlightLog';

function App() {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    if (!authLoaded) {
      store.dispatch(loadUser())
        .then(() => setAuthLoaded(true));
    }
  }, [authLoaded]);

  return (
    <Router>
      <Provider store={store}>
        <Header />
        {!authLoaded
          ? (
            <Loading />
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
