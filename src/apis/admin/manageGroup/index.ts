import instance from 'apis/instance';
import { AddNeweGroupForm } from 'types/workplace';

export const postAddNewGroup = (body: AddNeweGroupForm) => {
  return instance.post(`/workplace`, body);
};

// 초대링크 발급
export const getInviteKey = (): Promise<GetResponse> => {
  return instance.get(`/workplace/invitation`);
};

interface GetResponse {
  invitationKey: string;
}
