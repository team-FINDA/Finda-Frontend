import styled from '@emotion/styled';
import { type IconProps } from '@tabler/icons-react';
import { type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

type HeaderIcon = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

interface Props {
  title: string;
  Icon: HeaderIcon;
  actions?: ReactNode;
}

export const PageHeaderBar = ({ title, Icon, actions }: Props) => {
  return (
    <Container>
      <Left>
        <Icon stroke={2} size={19.2} />
        <Title>{title}</Title>
      </Left>
      <Actions>{actions}</Actions>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  padding: 25px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  color: ${({ theme }) => theme.color.gray[900]};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.p`
  ${({ theme }) => theme.font.SubHeading[2]};
  color: ${({ theme }) => theme.color.gray[900]};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
