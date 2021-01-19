import React from "react";
import Route from './route';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import Store from './store/store';
import { Provider } from 'react-redux'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function App() {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <Route />
      </ThemeProvider>
    </Provider>
  );
}
