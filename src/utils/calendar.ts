import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfWeek,
  isAfter,
  isBefore,
  max,
  min,
  startOfWeek,
} from 'date-fns';
import { ActivityDefinition, ActivityEvent, WeekEvent } from '@/components/calendar/types';

export const isDateWithinRange = (date: Date, start: Date, end: Date) => !isBefore(date, start) && !isAfter(date, end);

export const expandSchedulesToEvents = (definitions: ActivityDefinition[]): ActivityEvent[] =>
  definitions.flatMap((activity) =>
    activity.schedules.map((schedule) => ({
      id: schedule.id,
      activityId: activity.id,
      label: activity.label,
      color: activity.color,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
    }))
  );

export const splitByWeek = (days: Date[]) => {
  const rows: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
  return rows;
};

export const clampDayIndex = (index: number) => {
  if (index < 0) return 0;
  if (index > 6) return 6;
  return index;
};

export const resolveDayIndexFromPointer = (clientX: number, rectLeft: number, rectWidth: number) => {
  const rawIndex = Math.floor(((clientX - rectLeft) / rectWidth) * 7);
  return clampDayIndex(rawIndex);
};

export const toWeekEvents = (week: Date[], events: ActivityEvent[]): WeekEvent[] => {
  const weekStart = week[0];
  const weekEnd = week[6];

  const visibleEvents = events
    .filter((event) => isDateWithinRange(event.startDate, weekStart, weekEnd) || isDateWithinRange(event.endDate, weekStart, weekEnd) || isDateWithinRange(weekStart, event.startDate, event.endDate))
    .map((event) => {
      const visibleStart = max([event.startDate, weekStart]);
      const visibleEnd = min([event.endDate, weekEnd]);
      const startColumn = differenceInCalendarDays(visibleStart, weekStart) + 1;
      const span = differenceInCalendarDays(visibleEnd, visibleStart) + 1;
      const endColumn = startColumn + span - 1;

      return {
        id: event.id,
        label: event.label,
        color: event.color,
        startColumn,
        span,
        endColumn,
      };
    })
    .sort((a, b) => a.startColumn - b.startColumn || a.endColumn - b.endColumn);

  const laneEnds: number[] = [];

  return visibleEvents.map((event): WeekEvent => {
    let laneIndex = laneEnds.findIndex((endColumn) => event.startColumn > endColumn);

    if (laneIndex === -1) {
      laneIndex = laneEnds.length;
      laneEnds.push(event.endColumn);
    } else {
      laneEnds[laneIndex] = event.endColumn;
    }

    return {
      id: event.id,
      label: event.label,
      color: event.color,
      startColumn: event.startColumn,
      span: event.span,
      lane: laneIndex + 1,
    };
  });
};

export const getLaneMapForDate = (date: Date, events: ActivityEvent[]) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const weekEvents = toWeekEvents(weekDays, events);

  return new Map(weekEvents.map((event) => [event.id, event.lane]));
};
