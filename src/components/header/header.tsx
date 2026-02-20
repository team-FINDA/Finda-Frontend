import PathArrow from '@/assets/pathArrow.svg';
import styled from '@emotion/styled';
import Link from 'next/link';

interface HeaderProps {
  breadcrumb?: string;
}

const Header = ({ breadcrumb = '대시보드' }: HeaderProps) => {
  return (
    <Container>
      <PathHeader>
        <Path>
          <PastText href='/'>FINDA</PastText>
          <PathArrow width={3} />
          <CurrentText>{breadcrumb}</CurrentText>
        </Path>
      </PathHeader>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
`;

const PathHeader = styled.div`
  width: 100%;
  padding: 20px 30px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

const CurrentText = styled.p`
  ${({ theme }) => theme.font.Caption[1]};
  color: ${({ theme }) => theme.color.gray[900]};
`;

const PastText = styled(Link)`
  ${({ theme }) => theme.font.Caption[2]};
  color: ${({ theme }) => theme.color.gray[900]};
`;

const Path = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
`;
