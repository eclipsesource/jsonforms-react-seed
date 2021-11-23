import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Customize form so each control has more space
 */
const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        margin: '0.4em 0',
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
