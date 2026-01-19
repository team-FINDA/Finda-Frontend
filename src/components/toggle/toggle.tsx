import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { IconChevronDown, IconFish } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const Toggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const listItems = [
    {
      label: '선생님 신발 싹싹 핥기',
      id: 'a',
    },
    {
      label: '몸팔아서 대마고 부흥시키기',
      id: 'b',
    },
  ];

  return (
    <Container>
      <ButtonBox onClick={() => setIsOpen((prev) => !prev)}>
        <Icon isOpen={isOpen}>
          <IconChevronDown stroke={4} size={12} color={theme.color.gray[600]} />
        </Icon>
        <p>봉사활동</p>
      </ButtonBox>
      <List isOpen={isOpen}>
        {listItems.map((x, i) => {
          return (
            <ListItem key={i} href={`/ex/${x.id}`}>
              <IconFish size={16} color={theme.color.gray[600]} />
              {x.label}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Toggle;

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 15px;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonBox = styled.div`
  width: fit-content;
  display: flex;
  font-size: ${theme.font.Caption[1].fontSize};
  font-weight: ${theme.font.Caption[1].fontWeight};
  color: ${theme.color.gray[600]};
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

export const Icon = styled.div<{ isOpen: boolean }>`
  padding: 5px;
  transform: rotate(${(props) => (props.isOpen ? '0deg' : '-90deg')});
  transition: 0.3s ease;
`;

export const List = styled.div<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? '200px' : '0')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: translateY(${(props) => (props.isOpen ? '0' : '-8px')});
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition:
    max-height 0.1s ease,
    opacity 0.1s ease,
    transform 0.1s ease;
`;

export const ListItem = styled(Link)`
  width: 100%;
  font-size: ${theme.font.Body[4].fontSize};
  font-weight: ${theme.font.Body[4].fontWeight};
  color: ${theme.color.gray[900]};
  padding: 15px 10px;
  display: flex;
  gap: 6px;
  align-items: center;

  &:not(:first-child) {
    border-top: 1px solid ${theme.color.gray[300]};
  }
`;
