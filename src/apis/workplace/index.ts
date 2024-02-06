import instance from 'apis/instance';
import { Worker } from 'types/schedule';

export const getMyWorkplace = (): Promise<GetResponse> => {
  return instance.get(`/workplace`);
};

interface GetResponse {
  workplaceName: string;
  members: Worker[];
}
