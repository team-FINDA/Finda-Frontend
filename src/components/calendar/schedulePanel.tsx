import DateSection from '@/components/section/dateSection';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { IconClipboardText } from '@tabler/icons-react';

type Item = {
  id: string;
  label: string;
  color: string;
};

interface Props {
  selectedDate: Date;
  onPrevDate: () => void;
  onNextDate: () => void;
  plannedActivities: Item[];
  recruitingActivities: Item[];
}

const SchedulePanel = ({ selectedDate, onPrevDate, onNextDate, plannedActivities, recruitingActivities }: Props) => {
  return (
    <DayPanel>
      <DateSection
        title='일정'
        options={[
          {
            id: 'date',
            value: format(selectedDate, 'yyyy년 M월 d일', { locale: ko }),
            onPrev: onPrevDate,
            onNext: onNextDate,
          },
        ]}
      />

      <HalfSection>
        <SectionHeader>
          <IconClipboardText size={19.2} />
          예정된 봉사활동
        </SectionHeader>
        <SectionList>
          {plannedActivities.map((item) => (
            <SectionItem key={item.id} $color={item.color}>
              {item.label}
            </SectionItem>
          ))}
        </SectionList>
      </HalfSection>

      <HalfSection>
        <SectionHeader>
          <IconClipboardText size={19.2} />
          모집 중인 봉사활동
        </SectionHeader>
        <SectionList>
          {recruitingActivities.map((item) => (
            <SectionItem key={item.id} $color={item.color}>
              {item.label}
            </SectionItem>
          ))}
        </SectionList>
      </HalfSection>
    </DayPanel>
  );
};

export default SchedulePanel;

const DayPanel = styled.aside`
  min-height: 0;
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  gap: 1px;
  background-color: ${({ theme }) => theme.color.gray[300]};
`;

const HalfSection = styled.section`
  min-height: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.gray[100]};
`;

const SectionHeader = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${({ theme }) => theme.color.gray[200]};
  color: ${({ theme }) => theme.color.gray[500]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  ${({ theme }) => theme.font.Body[3]};
`;

const SectionList = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const SectionItem = styled.div<{ $color: string }>`
  min-height: 28px;
  display: flex;
  align-items: center;
  padding: 13px 20px;
  color: ${({ theme }) => theme.color.gray[100]};
  background-color: ${({ $color }) => $color};
  ${({ theme }) => theme.font.Caption[1]};
`;
