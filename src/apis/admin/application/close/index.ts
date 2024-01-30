import instance from 'apis/instance';
import { TimeWorkerListData } from 'apis/types';

export const postRecommends = (variables: PostRequest) => {
  return instance.post(`/fixed/${variables.startWeekDate}/${variables.selection}`);
};

interface PostRequest {
  startWeekDate: string;
  selection: number;
}

export const getRecommends = (variables: GetRequest): Promise<GetResponse> => {
  return instance.get(`/application/recommend/${variables.startWeekDate}`);
};

interface GetRequest {
  startWeekDate: string;
}

interface GetResponse {
  recommends: TimeWorkerListData[][][];
}
