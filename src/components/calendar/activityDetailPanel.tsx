import DateSection from '@/components/section/dateSection';
import styled from '@emotion/styled';
import {
  IconCalendarWeek,
  IconChartArcs3,
  IconClock,
  IconMoodSearch,
  IconX,
} from '@tabler/icons-react';
import { ActivityDetail } from './types';
import ActivityInfoList, { ActivityInfoItem } from './activityInfoList';

interface Props {
  detail: ActivityDetail;
  onClose: () => void;
}

const ActivityDetailPanel = ({ detail, onClose }: Props) => {
  const infoItems: ActivityInfoItem[] = [
    { id: 'status', label: '상태', value: detail.status, Icon: IconChartArcs3 },
    { id: 'noticeDate', label: '공지일', value: detail.noticeDate, Icon: IconCalendarWeek },
    { id: 'servicePeriod', label: '봉사 기간', value: detail.servicePeriod, Icon: IconCalendarWeek },
    { id: 'serviceHours', label: '봉사 시간', value: detail.serviceHours, Icon: IconClock },
    { id: 'target', label: '참여 대상', value: detail.target, Icon: IconMoodSearch },
    { id: 'quota', label: '모집 정원', value: detail.quota, Icon: IconMoodSearch },
  ];

  return (
    <Panel>
      <HeaderRow>
        <DateSection title='일정' options={[]} />
        <CloseButton type='button' onClick={onClose} aria-label='닫기'>
          <IconX size={19.2} stroke={2} />
        </CloseButton>
      </HeaderRow>

      <TitleRow>{detail.title}</TitleRow>

      <ActivityInfoList items={infoItems} />

      <ParticipantHeader>참여자</ParticipantHeader>

      <ParticipantList>
        {detail.participants.map((participant) => {
          const isClosedAndNotAttended = detail.status === '마감됨' && !participant.attended;

          return (
            <ParticipantRow key={participant.number} $highlight={isClosedAndNotAttended}>
              <ParticipantCell $danger={isClosedAndNotAttended}>{participant.number}</ParticipantCell>
              <ParticipantCell $danger={isClosedAndNotAttended}>{participant.name}</ParticipantCell>
            </ParticipantRow>
          );
        })}
      </ParticipantList>
    </Panel>
  );
};

export default ActivityDetailPanel;

const Panel = styled.section`
  min-height: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.gray[100]};
`;

const HeaderRow = styled.div`
  position: relative;

  & > section {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.color.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TitleRow = styled.div`
  padding: 13px 20px;
  ${({ theme }) => theme.font.Body[1]};
  color: ${({ theme }) => theme.color.gray[900]};
  background-color: ${({ theme }) => theme.color.gray[200]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

const ParticipantHeader = styled.div`
  padding: 10px 18px;
  text-align: center;
  ${({ theme }) => theme.font.Body[4]};
  color: ${({ theme }) => theme.color.gray[500]};
  background-color: ${({ theme }) => theme.color.gray[200]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

const ParticipantList = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const ParticipantRow = styled.div<{ $highlight: boolean }>`
  display: grid;
  grid-template-columns: 100px 1fr;
  padding: 10px 18px;
  background-color: ${({ $highlight, theme }) => ($highlight ? theme.color.WebSub.red[100] : 'transparent')};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

const ParticipantCell = styled.div<{ $danger: boolean }>`
  ${({ theme }) => theme.font.Body[4]};
  color: ${({ $danger, theme }) => ($danger ? theme.color.Red[100] : theme.color.gray[600])};
`;
