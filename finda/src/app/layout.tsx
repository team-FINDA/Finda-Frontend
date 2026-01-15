import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from '../styles/fonts';
import { Global } from '@emotion/react';
import { GlobalStyle } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'FINDA',
  description: 'FINDA로 봉사를 쉽고, 간편하게!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={pretendard.variable}>
      <body className='font-pretendard'>
        <Global styles={GlobalStyle} />
        {children}
      </body>
    </html>
  );
}
