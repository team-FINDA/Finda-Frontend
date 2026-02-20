import DateSection from '@/components/section/dateSection';
import styled from '@emotion/styled';
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { ActivityEvent } from './types';
import { resolveDayIndexFromPointer, splitByWeek, toWeekEvents } from '@/utils/calendar';

type DragMode = 'move' | 'resize-start' | 'resize-end';

type DragInfo = {
  eventId: string;
  mode: DragMode;
};

type DropTarget = {
  weekIndex: number;
  dayIndex: number;
};

interface Props {
  currentMonth: Date;
  events: ActivityEvent[];
  editable?: boolean;
  selectedEventId?: string | null;
  onSelectEvent?: (eventId: string) => void;
  onChangeMonth: (next: Date) => void;
  onChangeEvents: (next: ActivityEvent[]) => void;
}

const CalendarBoard = ({
  currentMonth,
  events,
  editable = false,
  selectedEventId = null,
  onSelectEvent,
  onChangeMonth,
  onChangeEvents,
}: Props) => {
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);

  const monthKey = currentMonth.getTime();

  const calendarWeeks = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return splitByWeek(days).map((daysInWeek) => ({
      days: daysInWeek,
      events: toWeekEvents(daysInWeek, events),
    }));
  }, [monthKey, events]);

  const handleDropToDate = (targetDate: Date) => {
    if (!editable || !dragInfo) return;

    const nextEvents = events.map((item) => {
      if (item.id !== dragInfo.eventId) return item;

      if (dragInfo.mode === 'move') {
        const duration = differenceInCalendarDays(item.endDate, item.startDate);
        return {
          ...item,
          startDate: targetDate,
          endDate: addDays(targetDate, duration),
        };
      }

      if (dragInfo.mode === 'resize-start') {
        return {
          ...item,
          startDate: targetDate > item.endDate ? item.endDate : targetDate,
        };
      }

      return {
        ...item,
        endDate: targetDate < item.startDate ? item.startDate : targetDate,
      };
    });

    onChangeEvents(nextEvents);
    setDragInfo(null);
    setDropTarget(null);
  };

  useEffect(() => {
    if (!editable) {
      setDragInfo(null);
      setDropTarget(null);
    }
  }, [editable]);

  return (
    <MainPanel>
      <DateSection
        title='캘린더'
        options={[
          {
            id: 'month',
            value: format(currentMonth, 'yyyy년 M월', { locale: ko }),
            onPrev: () => onChangeMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)),
            onNext: () => onChangeMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)),
          },
        ]}
      />

      <CalendarBody>
        <CalendarRows $rowCount={calendarWeeks.length}>
          {calendarWeeks.map((week, weekIndex) => (
            <WeekRow
              key={`week-${weekIndex}`}
              onDragOver={(e) => {
                if (!editable || !dragInfo) return;
                e.preventDefault();

                const rect = e.currentTarget.getBoundingClientRect();
                const dayIndex = resolveDayIndexFromPointer(e.clientX, rect.left, rect.width);
                setDropTarget((prev) => {
                  if (prev?.weekIndex === weekIndex && prev.dayIndex === dayIndex) return prev;
                  return { weekIndex, dayIndex };
                });
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (!editable) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const dayIndex = resolveDayIndexFromPointer(e.clientX, rect.left, rect.width);
                handleDropToDate(week.days[dayIndex]);
              }}
            >
              <ColumnHighlightLayer>
                {week.days.map((day, dayIndex) => (
                  <ColumnHighlightCell
                    key={`${day.toISOString()}-highlight`}
                    $active={dropTarget?.weekIndex === weekIndex && dropTarget.dayIndex === dayIndex}
                  />
                ))}
              </ColumnHighlightLayer>

              <DayRow>
                {week.days.map((day) => (
                  <DayCell key={day.toISOString()} $muted={day.getMonth() !== currentMonth.getMonth()}>
                    {format(day, 'd일', { locale: ko })}
                  </DayCell>
                ))}
              </DayRow>

              <EventLayer>
                {week.events.map((event) => (
                  <EventBar
                    key={`${weekIndex}-${event.id}-${event.lane}`}
                    $lane={event.lane}
                    $startColumn={event.startColumn}
                    $span={event.span}
                    $color={event.color}
                    $editable={editable}
                    $selected={!editable && selectedEventId === event.id}
                    draggable={editable}
                    tabIndex={editable ? -1 : 0}
                    role={editable ? undefined : 'button'}
                    aria-pressed={editable ? undefined : selectedEventId === event.id}
                    onDragStart={(e) => {
                      if (!editable) return;
                      e.dataTransfer.setData('text/plain', event.id);
                      setDragInfo({ eventId: event.id, mode: 'move' });
                    }}
                    onDragEnd={() => {
                      setDragInfo(null);
                      setDropTarget(null);
                    }}
                    onClick={() => {
                      if (editable) return;
                      onSelectEvent?.(event.id);
                    }}
                    onKeyDown={(e) => {
                      if (editable) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectEvent?.(event.id);
                      }
                    }}
                  >
                    {editable && (
                      <ResizeHandle
                        data-side='left'
                        draggable
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.setData('text/plain', event.id);
                          setDragInfo({ eventId: event.id, mode: 'resize-start' });
                        }}
                        onDragEnd={() => {
                          setDragInfo(null);
                          setDropTarget(null);
                        }}
                      />
                    )}
                    <EventLabel>{event.label}</EventLabel>
                    {editable && (
                      <ResizeHandle
                        data-side='right'
                        draggable
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.setData('text/plain', event.id);
                          setDragInfo({ eventId: event.id, mode: 'resize-end' });
                        }}
                        onDragEnd={() => {
                          setDragInfo(null);
                          setDropTarget(null);
                        }}
                      />
                    )}
                  </EventBar>
                ))}
              </EventLayer>
            </WeekRow>
          ))}
        </CalendarRows>
      </CalendarBody>
    </MainPanel>
  );
};

export default CalendarBoard;

const MainPanel = styled.section`
  min-height: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.gray[100]};
`;

const CalendarBody = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const CalendarRows = styled.div<{ $rowCount: number }>`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(${({ $rowCount }) => $rowCount}, minmax(0, 1fr));
  gap: 1px;
  background-color: ${({ theme }) => theme.color.gray[300]};
`;

const WeekRow = styled.div`
  min-height: 0;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.gray[100]};
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ColumnHighlightLayer = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  pointer-events: none;
`;

const ColumnHighlightCell = styled.div<{ $active: boolean }>`
  background-color: ${({ $active, theme }) => ($active ? theme.color.Blue[100] : 'transparent')};
`;

const DayRow = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
`;

const DayCell = styled.div<{ $muted: boolean }>`
  ${({ theme }) => theme.font.Body[2]};
  color: ${({ $muted, theme }) => ($muted ? theme.color.gray[400] : theme.color.gray[600])};
`;

const EventLayer = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: 28px;
`;

const EventBar = styled.div<{
  $lane: number;
  $startColumn: number;
  $span: number;
  $color: string;
  $editable: boolean;
  $selected: boolean;
}>`
  grid-row: ${({ $lane }) => $lane};
  grid-column: ${({ $startColumn, $span }) => `${$startColumn} / span ${$span}`};
  position: relative;
  height: 28px;
  display: flex;
  align-items: center;
  padding: 5px 12px;
  color: ${({ theme }) => theme.color.gray[100]};
  background-color: ${({ $color }) => $color};
  ${({ theme }) => theme.font.Caption[4]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  cursor: ${({ $editable }) => ($editable ? 'grab' : 'pointer')};
  box-shadow: ${({ $selected, theme }) => ($selected ? `inset 0 0 0 1px ${theme.color.gray[900]}` : 'none')};

  &:active {
    cursor: ${({ $editable }) => ($editable ? 'grabbing' : 'default')};
  }
`;

const EventLabel = styled.span`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ResizeHandle = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  cursor: ew-resize;
  opacity: 0.7;
  z-index: 2;
  background-color: transparent;

  &[data-side='left'] {
    left: 0;
  }

  &[data-side='right'] {
    right: 0;
  }
`;
