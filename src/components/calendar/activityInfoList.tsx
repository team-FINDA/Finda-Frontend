import styled from '@emotion/styled';
import { type IconProps } from '@tabler/icons-react';
import { type ForwardRefExoticComponent, type RefAttributes } from 'react';

type InfoIcon = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

export type ActivityInfoItem = {
  id: string;
  label: string;
  value: string;
  Icon: InfoIcon;
};

interface Props {
  items: ActivityInfoItem[];
}

const ActivityInfoList = ({ items }: Props) => {
  return (
    <List>
      {items.map((item) => (
        <Row key={item.id}>
          <LabelCell>
            <item.Icon size={19.2} stroke={2} />
            {item.label}
          </LabelCell>
          <ValueCell>{item.value}</ValueCell>
        </Row>
      ))}
    </List>
  );
};

export default ActivityInfoList;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 170px 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

const LabelCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  ${({ theme }) => theme.font.Body[4]};
  color: ${({ theme }) => theme.color.gray[500]};
  border-right: 1px solid ${({ theme }) => theme.color.gray[300]};
`;

const ValueCell = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 18px;
  ${({ theme }) => theme.font.Body[4]};
  color: ${({ theme }) => theme.color.gray[500]};
`;
