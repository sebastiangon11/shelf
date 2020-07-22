import React from 'react';
import ReactDOM from 'react-dom';

import ElectronContext from './context/electron-context';
import StoreContext from './context/store-context';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/mui-theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ElectronContext.Provider>
      <StoreContext.Provider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StoreContext.Provider>
    </ElectronContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
