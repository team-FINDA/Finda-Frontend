import {
  IconSmartHome,
  IconBell,
  IconClipboardText,
  IconCalendarWeek,
  IconId,
  IconAdjustmentsAlt,
  IconProps,
} from '@tabler/icons-react';
import ProfileIcon from '@/assets/profile.svg';
import styled from '@emotion/styled';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import Link from 'next/link';
import Toggle from '../toggle/toggle';
import { useTheme } from '@emotion/react';
type tab = {
  label: string;
  path: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
};

const tabs: tab[] = [
  {
    label: '대시보드',
    path: '/',
    icon: IconSmartHome,
  },
  {
    label: '공지사항',
    path: '/',
    icon: IconBell,
  },
  {
    label: '봉사활동',
    path: '/',
    icon: IconClipboardText,
  },
  {
    label: '캘린더',
    path: '/',
    icon: IconCalendarWeek,
  },
  {
    label: '학생관리',
    path: '/',
    icon: IconId,
  },
];

export const Sidebar = () => {
const theme = useTheme();

  return (
    <Container>
      <Head>
        <GrayCaption1>FINDA</GrayCaption1>
        <GrayCaption1>봉사활동을 더 편하게</GrayCaption1>
      </Head>
      <Main>
        <Tabs>
          {tabs.map((x, i) => {
            const Icon = x.icon;

            return (
              <Tab key={i} href={x.path}>
                <Icon stroke={2} size={20} />
                {x.label}
              </Tab>
            );
          })}
        </Tabs>
        <Toggles>
          <Toggle />
          <Toggle />
          <Toggle />
          <Toggle />
          <Toggle />
        </Toggles>
      </Main>
      <Footer>
        <ProfileBox>
          <ProfileIcon width={32} height={32} />
          <TextBox>
            <GrayCaption1>김시우</GrayCaption1>
            <p>산학협력부 교사</p>
          </TextBox>
        </ProfileBox>
        <IconAdjustmentsAlt size={19.2} color={theme.color.gray[600]} />
      </Footer>
    </Container>
  );
};

export const Container = styled.div`
  height: 100dvh;
  width: 20dvw;
  max-width: 450px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${props => props.theme.color.gray[300]};
  background-color: ${props => props.theme.color.gray[200]};
`;

export const Head = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.color.gray[300]};
  align-items: center;
  justify-content: space-between;
  padding: 28px;
`;

export const GrayCaption1 = styled.p`
  ${props => props.theme.font.Caption[1]};
  color: ${props => props.theme.color.gray[600]};
`;

export const Main = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Tabs = styled.div``;

export const Tab = styled(Link)`
  border-radius: 15px;
  background-color: ${props => props.theme.color.gray[200]};
  width: 100%;
  display: flex;
  gap: 15px;
  padding: 15px;
  ${props => props.theme.font.Body[3]};
  color: ${props => props.theme.color.gray[900]};

  &:hover {
    background-color: ${props => props.theme.color.gray[300]};
  }
`;

export const Toggles = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

export const Footer = styled.div`
  width: 100%;
  margin-top: auto;
  border-top: 1px solid ${props => props.theme.color.gray[300]};
  display: flex;
  padding: 20px 30px;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileBox = styled.div`
  display: flex;
  gap: 10px;
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.theme.font.Caption[4]};
  color: ${props => props.theme.color.gray[600]};
`;
