import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: { main: '#4F46E5' },  // Índigo
    secondary: { main: '#10B981' }, // Verde
    background: { default: '#F9FAFB' },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif' },
  },
});