export type ActivityEvent = {
  id: string;
  activityId: string;
  label: string;
  color: string;
  startDate: Date;
  endDate: Date;
};

export type ActivitySchedule = {
  id: string;
  startDate: Date;
  endDate: Date;
};

export type ActivityDefinition = {
  id: string;
  label: string;
  color: string;
  schedules: ActivitySchedule[];
};

export type ActivityParticipant = {
  number: string;
  name: string;
  attended: boolean;
};

export type ActivityDetail = {
  id: string;
  title: string;
  status: string;
  noticeDate: string;
  servicePeriod: string;
  serviceHours: string;
  target: string;
  quota: string;
  participants: ActivityParticipant[];
};

export type RecruitingActivity = {
  id: string;
  label: string;
  color: string;
  recruitStartDate: Date;
  recruitEndDate: Date;
};

export type WeekEvent = {
  id: string;
  label: string;
  color: string;
  startColumn: number;
  span: number;
  lane: number;
};
