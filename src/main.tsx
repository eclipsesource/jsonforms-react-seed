// TODO: Transition this project from Vite and MUI to a Next.js setup
// using Tailwind CSS and Radix UI/shadcn components.
// 1. Create a new Next.js project via `create-next-app`.
// 2. Move the existing components and context into the Next.js app.
// 3. Install Tailwind CSS and Radix UI (shadcn/ui) packages.
// 4. Replace Material UI components with their Radix/shadcn equivalents.
// 5. Adapt Vite-specific configuration to Next.js pages and routing.
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';

/**
 * Customize form so each control has more space
 */
const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '0.8em 0',
        },
      },
    },
  },
});

const rootEl = document.getElementById('root');

if (!rootEl) throw new Error('Failed to find the root element');

createRoot(rootEl).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
