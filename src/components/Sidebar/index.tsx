import Loader from 'components/Suspenses/Loader';
import GetInviteKeyModal from 'components/modals/GetInviteKeyModal';
import { useGetMyInfo, useGetMyWorkplace } from 'hooks/useGetMyInfo';
import useModal from 'hooks/useModal';
import useLogin from 'pages/auth/hooks/useLogin';
import { Suspense } from 'react';
import { Worker } from 'types/schedule';
import { UserType } from 'types/user';
import FlexContainer from '../@commons/FlexContainer';
import Text from '../@commons/Text';
import { HorizontalLine, SidebarBackground, SidebarBox } from './styles';

const Sidebar = ({ closeHandler }: { closeHandler: () => void }): JSX.Element => {
  return (
    <SidebarBackground onClick={closeHandler}>
      <SidebarBox onClick={(e) => e.stopPropagation()}>
        <Suspense fallback={<Loader />}>
          <SideBarContent />
        </Suspense>
      </SidebarBox>
    </SidebarBackground>
  );
};

export default Sidebar;

const SideBarContent = () => {
  const { userName, userType } = useGetMyInfo();

  return (
    <FlexContainer $wFull $justify="start" $gap="32px" $wrap="wrap">
      <MyMenu userName={userName} userType={userType} />
      {(userType === 'ALBA' || userType === 'ADMIN') && <GroupMenu />}
    </FlexContainer>
  );
};

const MyMenu = ({ userName, userType }: { userName: string; userType: UserType }) => {
  const { logout } = useLogin('/');
  const { modalOnHandler } = useModal();
  return (
    <>
      <FlexContainer $gap="12px" $padding="0">
        <FlexContainer $direction="row" $justify="start" $align="center">
          <Text size="lg" weight="bold" margin="0">
            {userName}
          </Text>
        </FlexContainer>
        <HorizontalLine />
      </FlexContainer>
      <FlexContainer $align="flex-start" $gap="20px">
        {userType === 'ADMIN' && (
          <button onClick={() => modalOnHandler(<GetInviteKeyModal />)}>
            <Text>직원 초대하기</Text>
          </button>
        )}
        <button onClick={logout}>
          <Text>로그아웃</Text>
        </button>
      </FlexContainer>
    </>
  );
};

const GroupMenu = () => {
  const { workplaceName, members } = useGetMyWorkplace();
  return (
    <FlexContainer $wFull $align="flex-start" $gap="16px">
      <Text weight="bold" margin="0">
        {workplaceName}
      </Text>
      <HorizontalLine />

      <FlexContainer as="ol" $wFull $align="flex-start" $gap="16px">
        {members?.map((member: Worker) => (
          <li key={`${member.userName}${member.userId}`}>
            <Text>{member.userName}</Text>
          </li>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};
