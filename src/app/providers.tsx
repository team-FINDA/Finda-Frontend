'use client';

import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from '@/styles/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyle} />
      {children}
    </ThemeProvider>
  );
}
