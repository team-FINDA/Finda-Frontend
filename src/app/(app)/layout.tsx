'use client';

import Header from '@/components/header/header';
import { Sidebar } from '@/components/sidebar/sidebar';
import styled from '@emotion/styled';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <Sidebar />
      <Page>
        <Header />
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
