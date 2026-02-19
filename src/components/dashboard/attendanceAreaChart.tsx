'use client';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Flex } from '@/components/common';

type AreaDatum = {
  month: string;
  value: number;
};

interface Props {
  data: AreaDatum[];
  title: string;
  width?: number;
  height?: number;
}

const AttendanceAreaChart = ({ data, title, width = 360, height = 150 }: Props) => {
  const theme = useTheme();

  return (
    <Flex direction='column' gap={15}>
      <TitleText>{title}</TitleText>
      <AreaChart data={data} width={width} height={height}>
        <CartesianGrid stroke={theme.color.gray[400]} strokeDasharray='4 2' strokeWidth={1.2} />
        <XAxis
          dataKey='month'
          tickLine={false}
          axisLine={false}
          tick={{ fill: theme.color.gray[800], fontSize: 12, fontWeight: 400 }}
        />
        <YAxis
          width={30}
          ticks={[0, 25, 50, 75, 100]}
          interval={0}
          tickLine={false}
          axisLine={false}
          tick={{ fill: theme.color.gray[800], fontSize: 14, fontWeight: 400 }}
        />
        <Area
          type='linear'
          dataKey='value'
          stroke={theme.color.Blue[600]}
          strokeWidth={2}
          fill={theme.color.Blue[600]}
          fillOpacity={0.12}
          width={width}
          height={height}
          dot={({ cx, cy }) => (
            <circle cx={cx} cy={cy} r={3} fill='#fff' stroke={theme.color.Blue[600]} strokeWidth={2} />
          )}
          activeDot={false}
        />
      </AreaChart>
    </Flex>
  );
};

export default AttendanceAreaChart;

const TitleText = styled.p`
  ${({ theme }) => theme.font.Body[1]};
`;
