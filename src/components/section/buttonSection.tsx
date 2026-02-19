import styled from '@emotion/styled';

const ButtonSection = () => {
  return <></>;
};

export default ButtonSection;

const Container = styled.article<{ grow: boolean }>`
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
  grow?: boolean;
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
  border-bottom: 1px solid ${(props) => props.theme.color.gray[300]};
  color: ${(props) => props.theme.color.gray[500]};
  ${(props) => props.theme.font.Body[3]};
`;
