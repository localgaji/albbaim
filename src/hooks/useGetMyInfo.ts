import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from 'apis/auth';
import { getMyWorkplace } from 'apis/workplace';

export const useGetMyInfo = () => {
  const { data: myInfo } = useQuery(['myInfo'], () => getMyInfo(), {
    suspense: true,
    refetchOnWindowFocus: false,
  });

  const userName = myInfo?.userName || '';
  const userType = myInfo?.userType || null;

  return {
    userType,
    userName,
  };
};

export const useGetMyWorkplace = () => {
  const { data: myInfo } = useQuery(['myWorkplace'], () => getMyWorkplace(), {
    suspense: true,
    refetchOnWindowFocus: false,
  });

  const workplaceName = myInfo?.workplaceName || null;
  const members = myInfo?.members || [];

  return {
    workplaceName,
    members,
  };
};
