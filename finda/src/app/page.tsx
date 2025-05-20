'use client';

import OpeningAnimation from '@/components/openingAnimation';
import PageTransitionAnimation from '@/components/pageTransitionAnimation';
import styled from '@emotion/styled';

export default function Main() {
  return (
    <StickyContainer>
      <Screen>
        <OpeningAnimation />
        <PageTransitionAnimation />
      </Screen>
    </StickyContainer>
  );
}

const StickyContainer = styled.div`
  width: 100vw;
  height: 1000vh;
  position: relative;
`;

const Screen = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: #d8e3ff; //테스트용 나중에 배경색 바꾸기
  display: flex;
  justify-content: center;
  align-items: center;
`;
