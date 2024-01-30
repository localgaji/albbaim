import Loader from 'components/Suspenses/Loader';
import { useGetMyInfo } from 'hooks/useGetMyInfo';
import OnBoardingPage from 'pages/OnBoardingPage';
import SchedulePage from 'pages/SchedulePage';
import AdminMainIndex from 'pages/admin/AdminMainIndex';
import { AdminNoGroupPage } from 'pages/admin/ETCMainPage';
import { Suspense } from 'react';
import { loginDatahandlers } from 'utils/loginDatahandlers';
import { AlbaNoGroupPage } from './alba/AlbaMainIndex';

const HomeIndex = () => {
  const loginState = loginDatahandlers.getLoginData();
  const isLogin: boolean = loginState.isLogin;

  if (isLogin) {
    return (
      <Suspense fallback={<Loader />}>
        <MainByRoles />
      </Suspense>
    );
  }
  return <OnBoardingPage />;
};

export default HomeIndex;

const MainByRoles = () => {
  const { userType } = useGetMyInfo();

  switch (userType) {
    case 'ADMIN_NO_GROUP':
      return <AdminNoGroupPage />;
    case 'ADMIN':
      return <AdminMainIndex />;
    case 'ALBA_NO_GROUP':
      return <AlbaNoGroupPage />;
    case 'ALBA':
      return <SchedulePage isAdmin={false} />;
    default:
      return <></>;
  }
};
