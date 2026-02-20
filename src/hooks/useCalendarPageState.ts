import { ActivityDetail, ActivityEvent, RecruitingActivity } from '@/components/calendar/types';
import { getLaneMapForDate, isDateWithinRange } from '@/utils/calendar';
import { addDays, endOfMonth, format, isAfter, isBefore, startOfMonth, subDays } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

type ScheduleItem = {
  id: string;
  label: string;
  color: string;
};

interface Params {
  initialMonth: Date;
  initialDate: Date;
  initialEvents: ActivityEvent[];
  recruitingDefinitions: RecruitingActivity[];
  detailMap: Record<string, ActivityDetail>;
}

const getEventStatus = (referenceDate: Date, startDate: Date, endDate: Date) => {
  if (isBefore(referenceDate, startDate)) return '진행 예정';
  if (isAfter(referenceDate, endDate)) return '마감됨';
  return '진행중';
};

const useCalendarPageState = ({
  initialMonth,
  initialDate,
  initialEvents,
  recruitingDefinitions,
  detailMap,
}: Params) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>(initialEvents);
  const [isEditing, setIsEditing] = useState(false);
  const [draftEvents, setDraftEvents] = useState<ActivityEvent[] | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const workingEvents = draftEvents ?? activityEvents;
  const currentMonthKey = currentMonth.getTime();
  const selectedDateKey = selectedDate.getTime();

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    if (isBefore(selectedDate, monthStart)) {
      setSelectedDate(monthStart);
      return;
    }

    if (isAfter(selectedDate, monthEnd)) {
      setSelectedDate(monthEnd);
    }
  }, [currentMonthKey, selectedDateKey]);

  const plannedActivities = useMemo<ScheduleItem[]>(() => {
    const laneMap = getLaneMapForDate(selectedDate, workingEvents);

    return workingEvents
      .filter((event) => isDateWithinRange(selectedDate, event.startDate, event.endDate))
      .sort((a, b) => {
        const laneA = laneMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
        const laneB = laneMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
        if (laneA !== laneB) return laneA - laneB;
        return a.startDate.getTime() - b.startDate.getTime();
      })
      .map(({ id, label, color }) => ({ id, label, color }));
  }, [selectedDate, workingEvents]);

  const recruitingActivities = useMemo<ScheduleItem[]>(
    () =>
      recruitingDefinitions
        .filter((activity) => isDateWithinRange(selectedDate, activity.recruitStartDate, activity.recruitEndDate))
        .map(({ id, label, color }) => ({ id, label, color })),
    [recruitingDefinitions, selectedDate]
  );

  const selectedEvent = selectedEventId ? workingEvents.find((event) => event.id === selectedEventId) ?? null : null;

  const selectedActivityDetail = useMemo(() => {
    if (!selectedEvent) return null;
    const baseDetail = detailMap[selectedEvent.activityId];
    if (!baseDetail) return null;

    return {
      ...baseDetail,
      status: getEventStatus(selectedDate, selectedEvent.startDate, selectedEvent.endDate),
      servicePeriod: `${format(selectedEvent.startDate, 'yyyy.MM.dd')} ~ ${format(selectedEvent.endDate, 'yyyy.MM.dd')}`,
    };
  }, [detailMap, selectedDate, selectedEvent]);

  const showDetailPanel = !isEditing && !!selectedActivityDetail;

  const startEditMode = () => {
    setSelectedEventId(null);
    setDraftEvents(activityEvents.map((event) => ({ ...event })));
    setIsEditing(true);
  };

  const confirmEditMode = () => {
    if (draftEvents) {
      setActivityEvents(draftEvents);
    }
    setDraftEvents(null);
    setIsEditing(false);
  };

  const cancelEditMode = () => {
    setDraftEvents(null);
    setIsEditing(false);
  };

  const handleChangeEvents = (next: ActivityEvent[]) => {
    if (!isEditing) return;
    setDraftEvents(next);
  };

  const goPrevDate = () => {
    const monthStart = startOfMonth(currentMonth);
    if (selectedDate.getTime() <= monthStart.getTime()) return;
    setSelectedDate((prev) => subDays(prev, 1));
  };

  const goNextDate = () => {
    const monthEnd = endOfMonth(currentMonth);
    if (selectedDate.getTime() >= monthEnd.getTime()) return;
    setSelectedDate((prev) => addDays(prev, 1));
  };

  return {
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
  };
};

export default useCalendarPageState;
