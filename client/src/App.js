import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext'
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FlightLog from './components/FlightLog'

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
  const { loadUser } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    if (!authLoaded) {
      loadUser()
      .then(setAuthLoaded(true));
    }
  }, [authLoaded, loadUser]);

  return !authLoaded
    ? <CircularProgress className={classes.progress}
      color="secondary"
    />
    : (
      <>
        <AppBar className={classes.appBar}
          position="static"
        >
          <Typography variant="h4">
            Center Line
          </Typography>
        </AppBar>
        <FlightLog />
      </>
    )
}

export default App;
