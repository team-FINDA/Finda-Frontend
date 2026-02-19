import styled from '@emotion/styled';
import { IconProps } from '@tabler/icons-react';
import { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';

interface Props {
  title: string;
  readonly children: ReactNode;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  direction?: 'column' | 'row';
  gap?: number;
  justify?: 'center' | 'flex-end' | 'space-around';
  align?: 'center' | 'flex-end';
  grow?: boolean;
  padding?: string;
}

const BasicSection = ({ title, children, Icon, direction, gap, justify, align, grow = true, padding }: Props) => {
  return (
    <Container grow={grow}>
      <Title>
        <Icon stroke={2} size={20} />
        {title}
      </Title>
      <ContentBox direction={direction} gap={gap} justify={justify} align={align} padding={padding}>
        {children}
      </ContentBox>
    </Container>
  );
};

export default BasicSection;

const Container = styled.section<{ grow: boolean }>`
  flex: ${(props) => (props.grow ? '1' : '0 0 auto')};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.gray[100]};
`;

const ContentBox = styled.article<{
  direction?: 'column' | 'row';
  gap?: number;
  justify?: 'center' | 'flex-end' | 'space-around';
  align?: 'center' | 'flex-end';
  padding?: string;
}>`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  ${({ gap }) => gap && `gap: ${gap}px`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ padding }) => padding && `padding: ${padding}`};
`;

const Title = styled.section`
  width: 100%;
  padding: 16px 20px;
  display: flex;
  gap: 5px;
  background-color: ${(props) => props.theme.color.gray[200]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  color: ${(props) => props.theme.color.gray[500]};
  ${(props) => props.theme.font.Body[3]};
`;
