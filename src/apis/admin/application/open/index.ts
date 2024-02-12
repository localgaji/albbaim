import instance from 'apis/instance';
import { WorkTimeHeadCount } from 'types/schedule';

export const getTimeTemplate = (): Promise<GetResponse> => {
  return instance.get(`/workTime`);
};

interface GetResponse {
  template: WorkTimeHeadCount[][];
}

export const postOpenApplication = (requestBody: PostRequest) => {
  return instance.post(`/workTime`, requestBody);
};

interface PostRequest {
  template: WorkTimeHeadCount[][];
  startWeekDate: string;
}
