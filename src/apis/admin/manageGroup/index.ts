import instance from 'apis/instance';
import { AddNeweGroupForm } from 'apis/types';

export const postAddNewGroup = (body: AddNeweGroupForm) => {
  const workplaceNumber = body.workplaceNumber.slice(0, 2) + '-' + body.workplaceNumber.slice(2);
  return instance.post(`/workplace`, {
    ...body,
    workplaceNumber: workplaceNumber,
  });
};

// 초대링크 발급
export const getInviteKey = (): Promise<GetResponse> => {
  return instance.get(`/workplace/invitation`);
};

interface GetResponse {
  invitationKey: string;
}
