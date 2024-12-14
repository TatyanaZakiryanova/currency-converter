import { createTheme, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
    fontSize: 12,
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxHeight: 200,
          overflowY: 'auto',
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
