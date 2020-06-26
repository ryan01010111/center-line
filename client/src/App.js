import React from 'react';
import { AuthProvider } from './contexts/AuthContext'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FlightLog from './components/FlightLog'

const useStyles = makeStyles(() => ({
  appBar: {
    padding: 14
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppBar className={classes.appBar}
          position="static"
        >
          <Typography variant="h4">
            Center Line
          </Typography>
        </AppBar>
        <FlightLog />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
