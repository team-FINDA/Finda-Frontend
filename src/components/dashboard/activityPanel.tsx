'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

export type Participant = {
  number: string;
  name: string;
  attended: boolean;
};

export type Activity = {
  id: string;
  title: string;
  participants: Participant[];
};

interface Props {
  activities: Activity[];
}

const ActivityPanel = ({ activities }: Props) => {
  const [selectedId, setSelectedId] = useState(activities[0]?.id ?? '');
  const selected = activities.find((activity) => activity.id === selectedId) ?? activities[0];

  return (
    <Container>
      <ActivityList>
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            type='button'
            $active={activity.id === selected?.id}
            onClick={() => setSelectedId(activity.id)}
          >
            {activity.title}
          </ActivityItem>
        ))}
      </ActivityList>
      <ParticipantList>
        {selected?.participants.map((participant) => (
          <ParticipantRow key={participant.number} $attended={participant.attended}>
            <ParticipantCell>{participant.number}</ParticipantCell>
            <ParticipantCell>{participant.name}</ParticipantCell>
            <ParticipantCell>
              <StatusText $attended={participant.attended}>{participant.attended ? '참석' : '미참석'}</StatusText>
            </ParticipantCell>
          </ParticipantRow>
        ))}
      </ParticipantList>
    </Container>
  );
};

export default ActivityPanel;

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) minmax(260px, 1fr);
  width: 100%;
  height: 100%;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

const ActivityItem = styled.button<{ $active: boolean }>`
  padding: 10px 15px;
  text-align: left;
  background-color: ${({ $active, theme }) => ($active ? theme.color.gray[200] : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.color.gray[900] : theme.color.gray[600])};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  cursor: pointer;
  ${({ theme }) => theme.font.Body[4]};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }
`;

const ParticipantList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ParticipantRow = styled.div<{ $attended: boolean }>`
  display: grid;
  grid-template-columns: 90px 1fr 80px;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  background-color: ${({ $attended, theme }) => ($attended ? 'transparent' : theme.color.WebSub.red[100])};

  & > :nth-child(3) {
    text-align: center;
  }
`;

const ParticipantCell = styled.div`
  ${({ theme }) => theme.font.Body[4]};
  color: ${({ theme }) => theme.color.gray[600]};
`;

const StatusText = styled.span<{ $attended: boolean }>`
  color: ${({ $attended, theme }) => ($attended ? theme.color.WebSub.green : theme.color.Red[100])};
`;
