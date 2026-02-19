import styled from '@emotion/styled';
import { IconList } from '@tabler/icons-react';
import Link from 'next/link';

type Row = {
  id: string | number;
  href: string;
  cells: Array<string | number>;
};

interface Props {
  columns: string[];
  rows: Row[];
  template?: string;
}

const ListTable = ({ columns, rows, template }: Props) => {
  const resolvedTemplate = template ?? buildTemplate(columns);

  return (
    <Container>
      <Grid template={resolvedTemplate}>
        {columns.map((x, i) => (
          <HeaderCell key={i}>{i === 0 ? <IconList size={19.2} stroke={1.4} /> : x}</HeaderCell>
        ))}
        {rows.map((row) => (
          <RowLink key={row.id} href={row.href}>
            {row.cells.map((cell, index) => (
              <ItemCell key={`${row.id}-${index}`} className='list-cell'>
                {cell}
              </ItemCell>
            ))}
          </RowLink>
        ))}
      </Grid>
    </Container>
  );
};

export default ListTable;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div<{ template: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.template};
`;

const HeaderCell = styled.div`
  padding: 10px 30px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.color.gray[200]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  color: ${({ theme }) => theme.color.gray[500]};
  ${({ theme }) => theme.font.Body[3]};
`;

const RowLink = styled(Link)`
  display: contents;
  color: ${({ theme }) => theme.color.gray[500]};
  text-decoration: none;
  &:hover .list-cell {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }
  &:active .list-cell {
    color: ${({ theme }) => theme.color.Blue[400]};
  }
`;

const ItemCell = styled.div`
  padding: 13px 30px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[300]};
  color: inherit;
  ${({ theme }) => theme.font.Caption[3]};
`;

const buildTemplate = (columns: string[]) => {
  const first = '80px';
  const second = 'minmax(80px, 1fr)';
  const rest = Array.from({ length: Math.max(0, columns.length - 2) }, () => 'max-content').join(' ');
  return `${first} ${second}${rest ? ` ${rest}` : ''}`;
};
