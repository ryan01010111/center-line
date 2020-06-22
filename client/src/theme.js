import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: '#6ea1de',
      main: '#3973ac',
      dark: '#00487c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffff57',
      main: '#fff000',
      dark: '#c7be00',
      contrastText: '#000',
    },
    background: {
        default: '#444'
    }
  }
});

export default theme;
