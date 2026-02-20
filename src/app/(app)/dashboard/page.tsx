'use client';

import BasicSection from '@/components/section/basicSection';
import styled from '@emotion/styled';
import { IconChartPie2, IconBell, IconClipboardText } from '@tabler/icons-react';
import ListTable from '@/components/list/listTable';
import AttendancePieChart from '@/components/dashboard/attendancePieChart';
import AttendanceAreaChart from '@/components/dashboard/attendanceAreaChart';
import ActivityPanel, { Activity } from '@/components/dashboard/activityPanel';
import { Flex, PageHeaderBar } from '@/components/common';
import { IconPin } from '@tabler/icons-react';

const page = () => {
  const attendancePieData = [
    { name: '참석', value: 80, fill: '#6686FF' },
    { name: '미참석', value: 20, fill: '#FF5555' },
  ];

  const noticeRows = [
    { title: '도서관 청소 봉사활동', start: '2025년 12월 31일', end: '2026년 12월 31일', href: '/' },
    { title: '낙엽 쓸기', start: '2025년 12월 31일', end: '2026년 12월 31일', href: '/' },
    { title: '운동장 쓸기', start: '2025년 12월 31일', end: '2026년 12월 31일', href: '/' },
    { title: '운동장 쓸기', start: '2025년 12월 31일', end: '2026년 12월 31일', href: '/' },
    { title: '운동장 쓸기', start: '2025년 12월 31일', end: '2026년 12월 31일', href: '/' },
  ];

  const attendanceMockData = [
    { month: '3월', value: 10 },
    { month: '4월', value: 30 },
    { month: '5월', value: 72 },
    { month: '6월', value: 20 },
    { month: '7월', value: 62 },
  ];

  const activities: Activity[] = [
    {
      id: 'vol-1',
      title: '도서관 청소 봉사활동',
      participants: [
        { number: '2201', name: '강은찬', attended: false },
        { number: '2202', name: '김경민', attended: true },
        { number: '2203', name: '김도은', attended: true },
        { number: '2204', name: '김소희', attended: true },
      ],
    },
    {
      id: 'vol-2',
      title: '낙엽 쓸기',
      participants: [
        { number: '2205', name: '김시우', attended: false },
        { number: '2206', name: '민수아', attended: true },
        { number: '2207', name: '변도휘', attended: false },
      ],
    },
    {
      id: 'vol-3',
      title: '운동장 쓸기',
      participants: [
        { number: '2208', name: '양범건', attended: true },
        { number: '2209', name: '유재민', attended: true },
        { number: '2210', name: '이지훈', attended: true },
        { number: '2211', name: '이해나', attended: true },
        { number: '2212', name: '임한성', attended: true },
        { number: '2213', name: '정승우', attended: true },
        { number: '2214', name: '정승훈', attended: true },
        { number: '2215', name: '조성현', attended: true },
        { number: '2216', name: '하원', attended: true },
      ],
    },
  ];

  return (
    <Page>
      <PageHeaderBar title='대시보드' Icon={IconPin} />
      <DividerGroup>
        <DividerGroup direction='column'>
          <BasicSection
            title='통계보드'
            Icon={IconChartPie2}
            direction='row'
            align='center'
            justify='space-around'
            grow={false}
            padding='30px'
          >
            <Flex direction='column' gap={15}>
              <AttendancePieChart data={attendancePieData} title='봉사 참석률' subtitle='( 2025년 12월 31일 )' />
            </Flex>
            <Flex gap={15} direction='column'>
              <AttendanceAreaChart data={attendanceMockData} title='환경지킴이 출석률' />
            </Flex>
          </BasicSection>
          <BasicSection title='공지사항' Icon={IconBell} direction='column'>
            <ListTable
              columns={['#', '봉사활동', '시작일', '종료일']}
              rows={noticeRows.map((x, i) => ({
                id: x.title,
                href: x.href,
                cells: [`#${i + 1}`, x.title, x.start, x.end],
              }))}
            />
          </BasicSection>
        </DividerGroup>
        <BasicSection title='봉사활동' Icon={IconClipboardText}>
          <ActivityPanel activities={activities} />
        </BasicSection>
      </DividerGroup>
    </Page>
  );
};

export default page;

const Page = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const DividerGroup = styled.div<{ direction?: 'row' | 'column' }>`
  display: flex;
  flex: 1;
  flex-direction: ${(prop) => prop.direction ?? 'row'};
  gap: 1px;
  background: ${(p) => p.theme.color.gray[300]};
`;
