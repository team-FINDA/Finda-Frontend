'use client';

import { Flex } from '@/components/common';
import styled from '@emotion/styled';
import { Pie, PieChart } from 'recharts';

type PieDatum = {
  name: string;
  value: number;
  fill?: string;
};

interface Props {
  data: PieDatum[];
  title: string;
  subtitle?: string;
  width?: number;
  height?: number;
  outerRadius?: number;
}

const AttendancePieChart = ({
  data,
  title,
  subtitle,
  width = 170,
  height = 170,
  outerRadius = 85,
}: Props) => {
  return (
    <Flex direction='column' gap={15}>
      <Flex gap={10} align='flex-end'>
        <TitleText>{title}</TitleText>
        {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      </Flex>
      <Flex gap={10} align='center'>
        <PieChart width={width} height={height}>
          <Pie data={data} dataKey='value' nameKey='name' outerRadius={outerRadius} isAnimationActive={false} />
        </PieChart>
        <Flex direction='column' gap={5}>
          {data.map((item) => (
            <Flex key={item.name} gap={5} align='center'>
              <Dot color={item.fill ?? '#000'} />
              <LegendLabel>{item.name}</LegendLabel>
              <LegendValue>{`${item.value}%`}</LegendValue>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AttendancePieChart;

const TitleText = styled.p`
  ${({ theme }) => theme.font.Body[1]};
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.font.Caption[4]};
`;

const LegendLabel = styled.span`
  ${({ theme }) => theme.font.Caption[3]};
`;

const LegendValue = styled.span`
  ${({ theme }) => theme.font.Caption[4]};
`;

const Dot = styled.span<{ color: string }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: inline-block;
`;
