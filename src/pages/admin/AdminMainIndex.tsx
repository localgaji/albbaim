import { useGetMyWorkplace } from 'hooks/useGetMyInfo';
import SchedulePage from 'pages/SchedulePage';
import { AdminNoMemberPage } from 'pages/admin/ETCMainPage';

const AdminMainIndex = (): JSX.Element => {
  const { members } = useGetMyWorkplace();

  if (members.length > 1) {
    return <SchedulePage isAdmin />;
  }
  return <AdminNoMemberPage />;
};

export default AdminMainIndex;
