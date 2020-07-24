import { createMuiTheme } from '@material-ui/core/styles';

const overrides = {
  MuiCssBaseline: {
    '@global': {
      'html, body, #root': {
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box' as const,
        overflow: 'hidden'
      },
      body: {
        overflow: 'overlay'
      },
      '::-webkit-scrollbar': {
        width: 10,
        height: 10
      },
      '::-webkit-scrollbar-thumb': {
        background: 'rgba(90, 90, 90)'
      },
      '::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.2)'
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
