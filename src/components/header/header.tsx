import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IconPin } from '@tabler/icons-react';
import PathArrow from '@/assets/pathArrow.svg';

import Link from 'next/link';

const Header = () => {
  const theme = useTheme();
  return (
    <Container>
      <PathHeader>
        <Path>
          <PastText href={'/'}>FINDA</PastText>
          <PathArrow width={3} />
          <CurrentText>대시보드</CurrentText>
        </Path>
      </PathHeader>
      <CurrentHeader>
        <IconPin style={{ transform: 'rotate(-45deg)' }} fill={theme.color.gray[900]} size={19.2} />
        <PageTitle>대시보드</PageTitle>
      </CurrentHeader>
    </Container>
  );
};

export default Header;

export const Container = styled.div`
  width: 100%;
`;

export const PathHeader = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray[300]};
`;

export const CurrentText = styled.p`
  ${(props) => props.theme.font.Caption[1]};
  color: ${(props) => props.theme.color.gray[900]};
`;

export const PastText = styled(Link)`
  ${(props) => props.theme.font.Caption[2]};
  color: ${(props) => props.theme.color.gray[900]};
`;

export const Path = styled.div`
  display: flex;
  gap: 8px;
  height: 100%;
  align-items: center;
`;

export const CurrentHeader = styled.div`
  width: 100%;
  padding: 25px 30px;
  display: flex;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.gray[300]};
`;

const PageTitle = styled.p`
  ${(props) => props.theme.font.SubHeading[2]};
  color: ${(props) => props.theme.color.gray[900]};
`;
