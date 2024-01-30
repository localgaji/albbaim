import instance from 'apis/instance';
import { UserData } from 'apis/types';

export const getMyWorkplace = (): Promise<GetMyGroupResponse> => {
  return instance.get(`/workplace`);
};

interface GetMyGroupResponse {
  workplaceName: string;
  members: UserData[];
}
