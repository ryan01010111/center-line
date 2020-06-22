import React from 'react';
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
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar className={classes.appBar}
          position="static">
          <Typography variant="h4">
            Center Line
          </Typography>
        </AppBar>
        <FlightLog />
      </ThemeProvider>
    </div>
  );
}

export default App;
