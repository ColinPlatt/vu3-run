// theme.ts
import { Theme } from 'theme-ui';

export const theme: Theme = {
  colors: {
    background: '#0d76fc',
  },
  fonts: {
    body: 'Courier New, Courier, monospace',
    heading: 'Courier New, Courier, monospace',
    monospace: 'Courier New, Courier, monospace',
  },
  styles: {
    container: {
      padding: '0 2rem',
    },
    main: {
      minHeight: '100vh',
      padding: '4rem 0',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      display: 'flex',
      flex: 1,
      padding: '2rem 0',
      borderTop: '1px solid #eaeaea',
      justifyContent: 'center',
      alignItems: 'center',
    },
    'footer a': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
    },
    title: {
      a: {
        color: '#0d76fc',
        textDecoration: 'none',
        ':hover': {
          textDecoration: 'underline',
        },
        ':focus': {
          textDecoration: 'underline',
        },
        ':active': {
          textDecoration: 'underline',
        },
      },
      margin: '3rem 0',
      lineHeight: 1,
      fontSize: '2.5rem',
      textAlign: 'center',
    },
    description: {
      margin: '0 0 2rem',
      lineHeight: 1.5,
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    grid: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: '800px',
      '@media screen and (max-width: 600px)': {
        width: '100%',
        flexDirection: 'column',
      },
    },
    card: {
      margin: '1rem',
      padding: '1.5rem',
      textAlign: 'left',
      color: 'inherit',
      textDecoration: 'none',
      border: '1px solid #eaeaea',
      borderRadius: '10px',
      transition: 'color 0.15s ease, border-color 0.15s ease',
      maxWidth: '350px',
      ':hover': {
        color: '#0d76fc',
        borderColor: '#0d76fc',
      },
      ':focus': {
        color: '#0d76fc',
        borderColor: '#0d76fc',
      },
      ':active': {
        color: '#0d76fc',
        borderColor: '#0d76fc',
      },
      h2: {
        margin: '0 0 1rem 0',
        fontSize: '1.2rem',
      },
      p: {
        margin: 0,
        fontSize: '1.2rem',
        lineHeight: 1.5,
      },
    },
  },
};