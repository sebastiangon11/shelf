import { createMuiTheme } from '@material-ui/core/styles';

const overrides = {
  MuiCssBaseline: {
    '@global': {
      'html, body, #root': {
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box' as const,
        overflow: 'hidden'
      }
    }
  }
};

const palette = {
  type: 'dark' as const,
  primary: {
    main: '#3671b9'
  },
  secondary: {
    main: '#00d4ff'
  }
};

const theme = createMuiTheme({ overrides, palette });

export default theme;
