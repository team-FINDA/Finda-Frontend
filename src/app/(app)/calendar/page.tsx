'use client';

import ActivityDetailPanel from '@/components/calendar/activityDetailPanel';
import CalendarBoard from '@/components/calendar/calendarBoard';
import SchedulePanel from '@/components/calendar/schedulePanel';
import { ActivityDefinition, ActivityDetail, RecruitingActivity } from '@/components/calendar/types';
import { expandSchedulesToEvents } from '@/utils/calendar';
import { PageHeaderBar } from '@/components/common';
import useCalendarPageState from '@/hooks/useCalendarPageState';
import styled from '@emotion/styled';
import { IconCalendarWeek, IconCheck, IconEdit, IconX } from '@tabler/icons-react';

const JAN_2026_ACTIVITY_DEFINITIONS: ActivityDefinition[] = [
  {
    id: 'activity-1',
    label: '환경 지킴이 활동',
    color: '#7A8BFF',
    schedules: [{ id: 'a1-s1', startDate: new Date(2026, 0, 5), endDate: new Date(2026, 0, 12) }],
  },
  {
    id: 'activity-2',
    label: '낙엽 쓸기',
    color: '#5FC273',
    schedules: [{ id: 'a2-s1', startDate: new Date(2026, 0, 7), endDate: new Date(2026, 0, 14) }],
  },
  {
    id: 'activity-3',
    label: '운동장 쓸기',
    color: '#FF4E33',
    schedules: [
      { id: 'a3-s1', startDate: new Date(2026, 0, 7), endDate: new Date(2026, 0, 10) },
      { id: 'a3-s2', startDate: new Date(2026, 0, 22), endDate: new Date(2026, 0, 24) },
    ],
  },
];

const RECRUITING_ACTIVITY_DEFINITIONS: RecruitingActivity[] = [
  {
    id: 'recruit-1',
    label: '과학실 변기 닦기',
    color: '#7A8BFF',
    recruitStartDate: new Date(2026, 0, 20),
    recruitEndDate: new Date(2026, 0, 31),
  },
  {
    id: 'recruit-2',
    label: '도서관 정리',
    color: '#5FC273',
    recruitStartDate: new Date(2026, 0, 5),
    recruitEndDate: new Date(2026, 0, 15),
  },
];

const ACTIVITY_DETAIL_MAP: Record<string, ActivityDetail> = {
  'activity-1': {
    id: 'activity-1',
    title: '환경 지킴이 활동',
    status: '마감됨',
    noticeDate: '2025년 12월 31일',
    servicePeriod: '1학기',
    serviceHours: '4명',
    target: '전교생',
    quota: '4명',
    participants: [
      { number: '2201', name: '강은찬', attended: true },
      { number: '2205', name: '김시우', attended: false },
      { number: '2207', name: '변도휘', attended: true },
      { number: '2216', name: '하원', attended: true },
    ],
  },
  'activity-2': {
    id: 'activity-2',
    title: '낙엽 쓸기',
    status: '진행중',
    noticeDate: '2025년 12월 20일',
    servicePeriod: '1학기',
    serviceHours: '3시간',
    target: '전교생',
    quota: '12명',
    participants: [
      { number: '2202', name: '김경민', attended: true },
      { number: '2204', name: '김소희', attended: true },
    ],
  },
  'activity-3': {
    id: 'activity-3',
    title: '운동장 쓸기',
    status: '진행중',
    noticeDate: '2025년 12월 15일',
    servicePeriod: '1학기',
    serviceHours: '2시간',
    target: '2학년',
    quota: '8명',
    participants: [
      { number: '2208', name: '양병건', attended: true },
      { number: '2209', name: '유재민', attended: true },
      { number: '2210', name: '이지준', attended: false },
    ],
  },
};

const Page = () => {
  const {
    currentMonth,
    selectedDate,
    workingEvents,
    isEditing,
    selectedEventId,
    selectedActivityDetail,
    showDetailPanel,
    plannedActivities,
    recruitingActivities,
    setCurrentMonth,
    setSelectedEventId,
    startEditMode,
    confirmEditMode,
    cancelEditMode,
    handleChangeEvents,
    goPrevDate,
    goNextDate,
  } = useCalendarPageState({
    initialMonth: new Date(2026, 0, 1),
    initialDate: new Date(2026, 0, 1),
    initialEvents: expandSchedulesToEvents(JAN_2026_ACTIVITY_DEFINITIONS),
    recruitingDefinitions: RECRUITING_ACTIVITY_DEFINITIONS,
    detailMap: ACTIVITY_DETAIL_MAP,
  });

  return (
    <PageContainer>
      <PageHeaderBar
        title='캘린더'
        Icon={IconCalendarWeek}
        actions={
          isEditing ? (
            <ActionGroup>
              <IconButton type='button' aria-label='적용' onClick={confirmEditMode} $tone='confirm'>
                <IconCheck size={19.2} stroke={2} />
              </IconButton>
              <IconButton type='button' aria-label='취소' onClick={cancelEditMode} $tone='cancel'>
                <IconX size={19.2} stroke={2} />
              </IconButton>
            </ActionGroup>
          ) : (
            <IconButton type='button' aria-label='수정' onClick={startEditMode}>
              <IconEdit size={19.2} stroke={2} />
            </IconButton>
          )
        }
      />
      <Container $detailOpen={showDetailPanel}>
        <CalendarBoard
          currentMonth={currentMonth}
          events={workingEvents}
          editable={isEditing}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
          onChangeMonth={setCurrentMonth}
          onChangeEvents={handleChangeEvents}
        />
        {showDetailPanel && selectedActivityDetail ? (
          <ActivityDetailPanel detail={selectedActivityDetail} onClose={() => setSelectedEventId(null)} />
        ) : (
          <SchedulePanel
            selectedDate={selectedDate}
            onPrevDate={goPrevDate}
            onNextDate={goNextDate}
            plannedActivities={plannedActivities}
            recruitingActivities={recruitingActivities}
          />
        )}
      </Container>
    </PageContainer>
  );
};

export default Page;

const PageContainer = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div<{ $detailOpen: boolean }>`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: ${({ $detailOpen }) => ($detailOpen ? 'minmax(0, 1fr) minmax(0, 1fr)' : 'minmax(0, 1fr) 300px')};
  gap: 1px;
  background-color: ${({ theme }) => theme.color.gray[300]};
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconButton = styled.button<{ $tone?: 'confirm' | 'cancel' }>`
  border: none;
  background: transparent;
  color: ${({ $tone, theme }) => {
    if ($tone === 'confirm') return theme.color.WebSub.green;
    if ($tone === 'cancel') return theme.color.Red[100];
    return theme.color.gray[700];
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
