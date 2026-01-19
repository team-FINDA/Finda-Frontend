import type { Metadata } from 'next';
import './globals.css';
import { pretendard } from '../styles/fonts';
import Providers from './providers';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
