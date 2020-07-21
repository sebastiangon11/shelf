import React from 'react';
import ReactDOM from 'react-dom';

import ElectronContext from './context/electron-context';
import SettingsContext from './context/settings-context';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/mui-theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ElectronContext.Provider>
      <SettingsContext.Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </SettingsContext.Provider>
    </ElectronContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
