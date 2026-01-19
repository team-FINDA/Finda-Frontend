'use client';

import { Global } from '@emotion/react';
import { GlobalStyle } from '@/styles/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global styles={GlobalStyle} />
      {children}
    </>
  );
}
