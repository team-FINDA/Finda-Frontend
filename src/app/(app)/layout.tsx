'use client';

import Header from '@/components/header/header';
import { Sidebar } from '@/components/sidebar/sidebar';
import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <Container>
      <Sidebar />
      <Page>
        <Header breadcrumb={'봉사활동'} />
        {children}
      </Page>
    </Container>
  );
};

export default layout;

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: flex;
`;

const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
