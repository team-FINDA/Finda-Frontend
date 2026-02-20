import styled from '@emotion/styled';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export interface DateSectionOption {
  id: string;
  value: string;
  label?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

interface Props {
  title: string;
  options: DateSectionOption[];
}

const DateSection = ({ title, options }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Controls>
        {options.map((option, index) => (
          <OptionBlock key={option.id}>
            {index > 0 && <Divider />}
            <OptionContent>
              <ArrowButton type='button' onClick={option.onPrev} aria-label='이전'>
                <IconChevronLeft size={16} stroke={2} />
              </ArrowButton>
              {option.label && <Label>{option.label}</Label>}
              <Value>{option.value}</Value>
              <ArrowButton type='button' onClick={option.onNext} aria-label='다음'>
                <IconChevronRight size={16} stroke={2} />
              </ArrowButton>
            </OptionContent>
          </OptionBlock>
        ))}
      </Controls>
    </Container>
  );
};

export default DateSection;

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  background-color: ${({ theme }) => theme.color.gray[200]};
`;

const Title = styled.p`
  ${({ theme }) => theme.font.Body[4]};
  color: ${({ theme }) => theme.color.gray[500]};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OptionBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${({ theme }) => theme.font.Body[4]};
  color: ${({ theme }) => theme.color.gray[500]};
`;

const ArrowButton = styled.button`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.color.gray[500]};
  cursor: pointer;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.color.gray[500]};
`;

const Value = styled.span`
  ${({ theme }) => theme.font.Caption[1]};
  color: ${({ theme }) => theme.color.gray[900]};
`;

const Divider = styled.span`
  width: 1px;
  height: 16px;
  background-color: ${({ theme }) => theme.color.gray[300]};
`;
